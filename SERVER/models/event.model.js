const mongoose = require('mongoose');
const validator = require('validator');


const eventSchema = new mongoose.Schema({

    name: {

        required: true,
        type: String

    },

    description: {

        required: true,
        type: String


    },
    // eventImage: {
    //     type: Image

    // },

    startDate: {

        required: true,
        type: String

    },

    endDate: {

        required: true,
        type: String
    },



    schedule: {

        required: true,
        type: String


    },

    participants: {

        type: [mongoose.Schema.Types.ObjectId]

    },

    maxTeamNumber: {

        required: true,
        type: Number,
        default: 4

    },
    minTeamNumber: {

        required: true,
        type: Number,
        default: 1

    },

    location: {
        required: true,
        type: String


    },
    rooms: {
        required: true,
        type: [mongoose.Schema.Types.ObjectId]
    },

    juries: {

        required: true,
        type: [mongoose.Schema.Types.ObjectId]

    },
    moderators: {

        required: true,
        type: [mongoose.Schema.Types.ObjectId]

    }



});


const Event = mongoose.model('Event', eventSchema);
module.exports = { Event };