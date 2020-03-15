const mongoose = require('mongoose');
const validator = require('validator');

//so  ambiguities
const formSchema = new mongoose.Schema({


    questions: {

        required: true,
        type: String,



    },

    maxPointForQuestion: {

        required: true,
        type: String,


    }

});


const Form = mongoose.model('Form', formSchema);
module.exports = { Form };