const express = require('express');
const { registerPatient, getPatients, sort } = require('../controllers/patientCtrl');
const router = express.Router();

// register route
router.post('/signup', registerPatient)

// search patients by gender
router.get("/search", sort)

// router.get("/search", searchByAge)

// list of all patients
router.get('/', getPatients);

module.exports = router