const countryRoutes = require ("express").Router();

const {getAllCountries, getCountryByCode, createCountry, deleteCountry,updateVisitedStatus} = require("../controllers/countryControllers");

countryRoutes.get("/", getAllCountries); //getting all from the user1_countries table
countryRoutes.get("/:id", getCountryByCode);
countryRoutes.post("/", createCountry); 
countryRoutes.delete("/:id", deleteCountry);
countryRoutes.put("/:id", updateVisitedStatus);

module.exports = countryRoutes;