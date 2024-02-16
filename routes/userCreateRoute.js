const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');

router.route('/')
    .post(userController.createUser)

module.exports = router;
