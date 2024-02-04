const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminsControllers')

router.route('/')
    .get(adminController.getAllAdmins)
    .post(adminController.createAdmin)
    .patch(adminController.updateAdmin)
    .delete(adminController.deleteAdmin)

router.get('/:id', adminController.getAdminById)

module.exports = router