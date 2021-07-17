const express = require('express');
const { registerPatient, loginPatient, getPatients, sort } = require('../controllers/patientCtrl');
const router = express.Router();

// register route
router.post('/signup', registerPatient)


// login route
router.post('/signin', loginPatient)


// search patients by gender
router.get("/search", sort)

// router.get("/search", searchByAge)

// list of all patients
router.get('/', getPatients);

module.exports = router