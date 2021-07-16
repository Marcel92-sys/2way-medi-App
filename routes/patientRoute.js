const express = require('express');
const { registerPatient, loginPatient, getPatients, searchByGender } = require('../controllers/patientCtrl');
const router = express.Router();

// register route
router.post('/signup', registerPatient)


// login route
router.post('/signin', loginPatient)


// list of all patients
router.get('/', getPatients);

// search patients by gender
router.get('/?gender=value', searchByGender)

module.exports = router