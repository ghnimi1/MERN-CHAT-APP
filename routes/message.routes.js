const express = require('express')
const router = express.Router()
const messagesController = require('../controllers/message.controller')
const auth = require('../middleware/auth')

router.get('/:roomId', auth, messagesController.getMessages)
router.post('/:roomId', auth, messagesController.sendMessage)
router.delete('/:id', auth, messagesController.removeMessage);


module.exports = router