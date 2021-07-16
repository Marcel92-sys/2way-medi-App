const express = require('express');
const { register, login } = require('../controllers/workersCtrl');

const {getWorkers} = require('../controllers/workersCtrl')
const router = express.Router();


router.post('/register', register)
router.post('/signin', login)


router.get('/', getWorkers)
module.exports = router