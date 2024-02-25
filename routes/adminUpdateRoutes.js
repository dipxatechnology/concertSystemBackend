const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersControllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .patch(userController.updateUserInformation)
    

module.exports = router