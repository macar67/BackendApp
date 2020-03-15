const express = require('express');
const { auth } = require('./../middleware/authenticate');


const NewsFeedController = require('./../controllers/newsFeed.controller');

const router = new express.Router();


////////////////////////POST METHOD////////////////////////////////

router.post('/newsFeed/sendNews', auth, NewsFeedController.addNewsfeed); //create a new room


// /////////////////////////GET METHOD////////////////////////////////
router.get('/newsFeed/getNewsfeed', auth, NewsFeedController.allNews); //did not work!!!


// // /////////////////////////PATCH METHOD////////////////////////////////
// router.patch('/rooms/update', auth, RoomController.updateRoom); 
router.patch('/newsFeed/removePost/:postid', auth, NewsFeedController.removePost);


/////////////////////////DELETE METHOD////////////////////////////////
// / !!There shouldn't be a delete newsfeed route \\\
// //router.delete('/posts/deleteNews', NewsFeedController.deleteNews); //!!There shouldn't be a delete newsfeed route
/// !!There shouldn't be a delete newsfeed route \\\

module.exports = router