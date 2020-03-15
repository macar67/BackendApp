const express = require('express');
const { auth } = require('./../middleware/authenticate');


const UserController = require('./../controllers/user.controller');

const router = new express.Router();

////////////////////////POST METHOD////////////////////////////////
router.post('/signUp', UserController.signUp);
router.post('/login', UserController.login);
router.post('/users/logout', auth, UserController.logout); //logout 


/////////////////////////GET METHOD////////////////////////////////
router.get('/allUsers', auth, UserController.Users); //show all users if authenticated.. this can be shown only admins
router.get('/users/me', auth, UserController.getCurrentUser);
router.get('/users/logout/all', auth, UserController.logoutAll) //For all client (mobile-computer-tablet so on ) logout



/////////////////////////PATCH METHOD////////////////////////////////
router.patch('/users/me', auth, UserController.updateAccount) //user updata their own account
router.patch('/users/me/changePassword', auth, UserController.updatePassword) //user updata their own account


/////////////////////////DELETE METHOD////////////////////////////////
router.delete('/users/me', auth, UserController.deleteAccount) //user delete their account

module.exports = router