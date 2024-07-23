
const express=require("express");
const { saveColor, getColor,clearColors } = require("../controllers/mapControllers");
const mapRoutes = require ("express").Router();

// mapRoutes.get("/get-colors",getColor)
// mapRoutes.get("save-color",saveColor);
mapRoutes.get('/get-colors', getColor);
mapRoutes.post('/save-color', saveColor);
mapRoutes.delete('/clear-colors', clearColors);


module.exports = mapRoutes; 