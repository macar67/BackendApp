const express = require('express');
const { auth } = require('./../middleware/authenticate');


const TeamController = require('./../controllers/team.controller');

const router = new express.Router();


////////////////////////POST METHOD////////////////////////////////

router.post('/teams/add', auth, TeamController.addTeam); //create a new team



/////////////////////////GET METHOD////////////////////////////////
router.get('/teams/myTeam', auth, TeamController.getMyTeam); //get current user team
router.get('/teams/:teamid', auth, TeamController.getOtherTeam); //get others team id
router.get('/teams/allTeams', auth, TeamController.getAllTeams); //TODO:This is for admin auth. //did no finish



// /////////////////////////PATCH METHOD////////////////////////////////
router.patch('/teams/update', auth, TeamController.updateMyteam);
router.patch('/teams/updateTeamScore/:teamid', auth, TeamController.updateTeamScore); //juri yetkısı verılecek

router.patch('/teams/addMember/:teamid', auth, TeamController.addTeamMember);
router.patch('/teams/removeMember', auth, TeamController.removeTeamMember);


/////////////////////////DELETE METHOD////////////////////////////////
//router.delete('/teams/deleteTeam', TeamController.deleteAccount)

module.exports = router