const mongoose = require('mongoose');
const validator = require('validator');


const roomSchema = new mongoose.Schema({

    name: {

        required: true,
        type: String,



    },

    teams: {


        type: [mongoose.Schema.Types.ObjectId],
        default: null


    },
    maxTeamSize: {
        type: Number,
        required: true
    }




});


const Room = mongoose.model('Room', roomSchema);
module.exports = { Room };