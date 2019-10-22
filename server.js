require("dotenv").config();
const express = require("express");
var db = require("./models");
var mongojs = require("mongojs");

const app = express();
const path = require("path");

var axios = require("axios");


const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3000;


// const apiRoutes = require("./routes/apiRoutes");

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
mongoose.connect(process.env.MONGODB_URI || "mongodb://etjcoder:Seaisle1!@ds335678.mlab.com:35678/heroku_3v5cvq02")

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });



app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
