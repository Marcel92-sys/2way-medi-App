const express = require('express');
const { register } = require('../controllers/workersCtrl');

const {getWorkers} = require('../controllers/workersCtrl')
const router = express.Router();


router.post('/register', register)


router.get('/', getWorkers)
module.exports = router