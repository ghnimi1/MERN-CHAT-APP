const Message = require('../models/message.models')

const getMessages = async (req, res) => {
    const { roomId } = req.params
    try {
        const messages = await Message.find({ room_id: roomId })
        res.status(200).send(messages)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const sendMessage = async (req, res) => {
    try {
        if (req.body.text.length === 0)
            return res.status(400).json({ msg: "Required Message" })
        const msgToStore = {
            name: req.user.userName,
            user_id: req.user._id,
            room_id: req.params.roomId,
            text: req.body.text,
        }
        const msg = new Message(msgToStore);
        await msg.save()
        res.status(200).send(msg)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
const removeMessage = async (req, res) => {
    const { id } = req.params
    try {
        const message = await Message.findByIdAndDelete({ _id: id })
        if (!message) {
            res.status(404).send({ msg: `No message with id : ${id}` })
        }
        res.status(200).send({ msg: message })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    getMessages,
    sendMessage,
    removeMessage
}