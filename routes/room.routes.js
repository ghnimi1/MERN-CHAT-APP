const express = require('express')
const router = express.Router()
const roomsController = require('../controllers/room.controller')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/', auth, admin, roomsController.getRooms)
router.post('/', auth, roomsController.createRoom)
router.put('/:id', auth, admin, roomsController.updateRoom);
router.delete('/:id', auth, admin, roomsController.removeRoom);

module.exports = router