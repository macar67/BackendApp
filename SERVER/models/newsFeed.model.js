const mongoose = require('mongoose');
const validator = require('validator');

//so  ambiguities
const newsFeedSchema = new mongoose.Schema({


    posts: {

        required: true,
        type: [mongoose.Schema.Types.ObjectId],



    },

    pinnedPosts: {

        required: false,
        type: [mongoose.Schema.Types.ObjectId],


    },




});


const NewsFeed = mongoose.model('NewsFeed', newsFeedSchema);
module.exports = { NewsFeed };