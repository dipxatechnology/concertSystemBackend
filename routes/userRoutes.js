const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersControllers')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(userController.getAllUsers)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)
    
router.get('/:id', userController.getUserById)

module.exports = router