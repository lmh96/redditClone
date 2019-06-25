const express = require("express");
const parser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");

// const db = require("./models");

const PORT = process.env.PORT || 8080;

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('build'));

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// var http = require("http");
// setInterval(function () {
//     http.get("http://multiscraper.herokuapp.com");
// }, 300000);

// let user = process.env.USER;
// let pass = process.env.PASS;

// mongoose.connect('mongodb://' + user + ':' + pass + '@ds231307.mlab.com:31307/heroku_1klpw924');
mongoose.connect("mongodb://localhost/reddit", { useNewUrlParser: true });

app.listen(PORT, function () {
    console.log(
        "Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});

module.exports = app;