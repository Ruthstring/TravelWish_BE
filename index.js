const express = require("express")
const cors = require("cors");
const app =express();
require("dotenv").config();

const countryRoutes = require("./routes/countryRoutes");


const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.send("Hello World");
});

//Routes
app.use("/countries", countryRoutes);


app.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}`)
})