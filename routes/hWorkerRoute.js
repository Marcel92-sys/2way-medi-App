const express = require('express');
const { register, saveEncounter } = require('../controllers/workersCtrl');

const {getWorkers} = require('../controllers/workersCtrl')
const router = express.Router();


router.post('/register', register)


router.get('/', getWorkers)

router.patch('/:id/encounter/:patienceId', saveEncounter)
module.exports = router