const express = require('express');
const { auth } = require('./../middleware/authenticate');


const PostController = require('./../controllers/post.controller');

const router = new express.Router();


////////////////////////POST METHOD////////////////////////////////

router.post('/posts/newPost', auth, PostController.addPost); //create a new post



// /////////////////////////GET METHOD////////////////////////////////
router.get('/posts/getAllPosts', auth, PostController.AllPosts);
// router.get('/rooms/myTeamsRoom', auth, RoomController.myTeamsRoom);



// // /////////////////////////PATCH METHOD////////////////////////////////
// router.patch('/rooms/update', auth, RoomController.updateRoom); ///hata!!! team.findById did not work



/////////////////////////DELETE METHOD////////////////////////////////
router.delete('/posts/deletePost', PostController.deletePost)

module.exports = router