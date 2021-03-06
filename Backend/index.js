require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
var passport = require('passport');
const path = require("path");
// const client = require('./elasticsearch/connection');


const employerRoutes = require("./Routes/employerRoute");
const loginRoute = require("./Routes/loginRoute");
const logoutRoute = require("./Routes/logoutRoute");
const candidateRoutes = require("./Routes/candidateRoute");
const jobRoutes = require("./Routes/jobRoute");
const uploadRoute = require('./Routes/uploadRoute');
const signupRoute = require('./Routes/signupRoute');
const companyRoute = require('./Routes/companyRoute');


const env = process.env.NODE_ENV || 'development';

// client.ping(
//     function(error) {
//       if (error) {
//           console.error('Elasticsearch cluster is down!');
//       } else {
//           console.log('Elasticsearch is connected');  
//       }
//     }
//   );

mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true
    }).then(() => {
        console.log("DB CONNECTED");
    }).catch((error)=>console.log("DB CONNECTED FAILED"+error))

//PORT
const port = process.env.PORT || 8001;

// Step 1:
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
})


app.listen(port, () => {
    console.log(`app is running at ${port}`);
})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://3.16.108.26:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Methods', 'GET,HEAD,POST,OPTIONS,POST,PUT,DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Accept');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true}));
app.use(passport.initialize());

app.use("/api", employerRoutes);
app.use("/", loginRoute);
app.use("/", logoutRoute);
app.use("/api", candidateRoutes);
app.use("/", jobRoutes);
app.use("/", uploadRoute);
app.use("/", signupRoute);
app.use("/", companyRoute);

module.exports = app;