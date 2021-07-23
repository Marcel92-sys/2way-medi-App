const express = require('express');
const loginUser = require('../controllers/loginCtrl');

const router = express.Router();

router.post('/', loginUser)

module.exports = router