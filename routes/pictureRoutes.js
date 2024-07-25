
const express = require('express');
const { uploadImage } = require('../controllers/pictureController');
const { upload } = require('../cloudinaryConfig');

const pictureRoutes = express.Router();

pictureRoutes.post('/upload', upload.single('image'), uploadImage);

module.exports = pictureRoutes;