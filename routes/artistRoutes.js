const express = require('express')
const router = express.Router()
const artistController = require('../controllers/artistsControllers')

router.route('/')
    .get(artistController.getAllArtists)
    .post(artistController.createArtist)
    .patch(artistController.updateArtist)
    .delete(artistController.deleteArtist)

router.get('/:id', )

module.exports = router