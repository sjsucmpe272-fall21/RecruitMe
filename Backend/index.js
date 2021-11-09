require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const employerRoutes = require("./Routes/employerRoute");

const env = process.env.NODE_ENV || 'development';


mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true
    }).then(() => {
        console.log("DB CONNECTED");
    }).catch(console.log("DB CONNECTED FAILED"))

//PORT
const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`app is running at ${port}`);
})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", employerRoutes);

module.exports = app;