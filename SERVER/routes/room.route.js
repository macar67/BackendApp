const express = require('express');
const { auth } = require('./../middleware/authenticate');


const RoomController = require('./../controllers/room.controller');

const router = new express.Router();


////////////////////////POST METHOD////////////////////////////////

router.post('/rooms/newRoom', auth, RoomController.addNewRoom); //create a new room



/////////////////////////GET METHOD////////////////////////////////
router.get('/rooms/getAllRooms', auth, RoomController.showAllRooms);
router.get('/rooms/myTeamsRoom', auth, RoomController.myTeamsRoom);



// /////////////////////////PATCH METHOD////////////////////////////////
router.patch('/rooms/update', auth, RoomController.updateRoom);



/////////////////////////DELETE METHOD////////////////////////////////
router.delete('/rooms/deleteMyRoom', auth, RoomController.deleteMyRoom)

module.exports = router