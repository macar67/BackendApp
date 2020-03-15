const express = require('express');
const { auth } = require('./../middleware/authenticate');


const EventController = require('./../controllers/event.controller');

const router = new express.Router();


////////////////////////POST METHOD////////////////////////////////

router.post('/events/add', auth, EventController.addEvent); //create a new event



/////////////////////////GET METHOD////////////////////////////////
// router.get('/teams/myTeam', auth, EventController.getMyEvents); //get current user Events
// router.get('/Eventss/:Eventsid', auth, EventController.getOtherEvents); //get others Events id

// router.get('/events/allEvents', auth, EventController.getAllEvents);
// TODO:This is for admin auth. //did no finish



// /////////////////////////PATCH METHOD////////////////////////////////
router.patch('/events/update/:eventid', auth, EventController.updateEvent);
//router.patch('/teams/updateTeamScore/:teamid', auth, TeamController.updateTeamScore);//juri yetkısı verılecek

// router.patch('/teams/addMember/:teamid', auth, TeamController.addTeamMember);
// router.patch('/teams/removeMember', auth, TeamController.removeTeamMember);


/////////////////////////DELETE METHOD////////////////////////////////
//router.delete('/teams/deleteTeam', TeamController.deleteAccount)

module.exports = router