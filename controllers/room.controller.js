const Room = require('../models/room.model')

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({})
        res.status(200).send(rooms)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const createRoom = async (req, res) => {
    const { name } = req.body
    try {
        if (name.length === 0)
            return res.status(400).json({ msg: "Required Name" })
        const newRoom = {
            name: name,
        }
        const room = new Room(newRoom);
        await room.save()
        res.status(200).send(room)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const updateRoom = async (req, res) => {
    const room = await Room.findById(req.params.id)
    try {
        if (room) {
            room.name = req.body.name || room.name
        }
        const updatedRoom = await room.save()
        res.status(201).send(updatedRoom)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const removeRoom = async (req, res) => {
    const { id } = req.params
    try {
        const room = await Room.findByIdAndDelete({ _id: id })
        if (!room) {
            res.status(404).send({ msg: `No room with id : ${id}` })
        }
        res.status(200).send({ msg: 'room deleted' })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    getRooms,
    createRoom,
    updateRoom,
    removeRoom
}