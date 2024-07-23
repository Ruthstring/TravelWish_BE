

const { saveColor, getColor } = require("../controllers/mapControllers");
const mapRoutes = require ("express").Router();

// mapRoutes.get("/get-colors",getColor)
// mapRoutes.get("save-color",saveColor);
mapRoutes.get('/get-colors', getColor);
mapRoutes.post('/save-color', saveColor);

module.exports = mapRoutes; 