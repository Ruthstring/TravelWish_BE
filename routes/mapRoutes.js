
const express = require('express');
const { saveColor, getColor } = require('../controllers/mapControllers');
const router = express.Router();

// mapRoutes.get("/get-colors",getColor)
// mapRoutes.get("save-color",saveColor);
router.get('/get-colors', getColor);
router.post('/save-color', saveColor);

module.exports = router; 