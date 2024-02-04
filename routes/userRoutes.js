const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersControllers')

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)
    
router.get('/:id', userController.getUserById)

module.exports = router