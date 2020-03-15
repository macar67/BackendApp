const express = require('express');
const { auth } = require('./../middleware/authenticate');


const FormController = require('./../controllers/form.controller');

const router = new express.Router();


// ////////////////////////POST METHOD////////////////////////////////

router.post('/forms/addForm', auth, FormController.addForm); //create a new form



// /////////////////////////GET METHOD////////////////////////////////
router.get('/forms/getAllForms', auth, FormController.getAllForms);
router.get('/forms/getForm/:formid', auth, FormController.getFormById);


// // /////////////////////////PATCH METHOD////////////////////////////////
router.patch('/forms/updateForm/:formid', auth, FormController.updateForm);

// /////////////////////////DELETE METHOD////////////////////////////////
router.delete('/forms/deleteForm/:formid', FormController.deleteForm)

module.exports = router