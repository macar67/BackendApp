const mongoose = require('mongoose');
const validator = require('validator');


const postSchema = new mongoose.Schema({



    text: {

        required: true,
        type: String,



    },
    likes: {


    },
    owner: {

    },
    video: {

    },
    isPostVerified: {
        type: Boolean
    }




});


const Post = mongoose.model('Post', postSchema);
module.exports = { Post };