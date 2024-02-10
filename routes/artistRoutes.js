const express = require('express')
const router = express.Router()
const artistController = require('../controllers/artistsControllers')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(artistController.getAllArtists)
    .post(artistController.createArtist)
    .patch(artistController.updateArtist)
    .delete(artistController.deleteArtist)

router.get('/:id', artistController.getArtistById)

module.exports = router