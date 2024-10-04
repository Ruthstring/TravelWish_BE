const express = require("express")
const cors = require("cors");
const app =express();
require("dotenv").config();

const allowedOrigins=['http://localhost:8000', 'https://travelwish-be.onrender.com'];

const countryRoutes = require("./routes/countryRoutes");
const mapRoutes = require("./routes/mapRoutes")
const pictureRoutes=require("./routes/pictureRoutes")


const PORT = process.env.PORT || 8000;

app.use(express.json());


app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
}));


app.get("/", (req,res)=>{
    res.send("Hello World");
});

//Routes
app.use("/countries", countryRoutes);
app.use("/map", mapRoutes)
app.use("/pictures", pictureRoutes)

app.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}`)
})