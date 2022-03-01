require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const messageRouter = require('./routes/message.routes')
const roomRouter = require('./routes/room.routes')
const Room = require('./models/room.model')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

connectDB()
const users = [];
const addUser = ({ socket_id, userName, user_id, room_id }) => {
    const exist = users.find(user => user.room_id === room_id && user.user_id === user_id);
    if (exist) {
        return { error: 'User already exist in this room' }
    }
    const user = { socket_id, userName, user_id, room_id };
    users.push(user)
    console.log('users list', users)
    return { user }
}

const removeUser = (socket_id) => {
    const index = users.findIndex(user => user.socket_id === socket_id);
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}
const getUser = (socket_id) => users.find(user => user.socket_id === socket_id)
//routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/messages', messageRouter)
app.use('/api/rooms', roomRouter)

io.on('connection', (socket) => {
    console.log('a user connected');
    Room.find().then(result => {
        socket.emit('output-rooms', result)
    })
    socket.on('create-room', name => {
        io.emit('room-created', name)
    })
    socket.on('join', ({ userName, room_id, user_id }) => {
        const { error, user } = addUser({
            socket_id: socket.id,
            userName,
            room_id,
            user_id
        })
        socket.join(room_id);
        if (error) {
            console.log('join error', error)
        } else {
            console.log('join user', user)

        }
    })
    socket.on('sendMessage', (message, room_id) => {
        io.to(room_id).emit('message', message);
    })
    socket.on('get-messages-history', result => {
        socket.emit('output-messages', result)
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
});
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log(`Listening on port `, PORT);
})