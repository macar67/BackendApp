const mongoose = require('mongoose');
const validator = require('validator');


const teamSchema = new mongoose.Schema({
    name: {

        required: true,
        type: String,
        trim: true

    },
    // minlength: { default: 1 },
    // maxlength: { default: 4 },
    members: {

        required: false,
        type: [mongoose.Schema.Types.ObjectId],


        // validate(value) {
        //     if (value.size < 1 || value.size > 4) {
        //         throw new Error("Please errror")
        //     }
        // }

    },


    score: {
        default: 0,
        required: false,
        type: Number,

    },

    picture: {

        type: String
    },

    isTeamPictureVerified: {
        type: Boolean
    },

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }





});


const Team = mongoose.model('Team', teamSchema);
module.exports = { Team };