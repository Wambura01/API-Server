const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs"); //file system used to serve json files

const app = express(); //instance of express

app.use(bodyParser.json()); //to handle json data
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/routes.js")(app, fs); //loads our app and fs instances into the routes
//this attaches our route handling to our running server instance and access our JSON fles using fs helpers

const server = app.listen(3000, () => {
  console.log("Listening to PORT: ", server.address().port);
});
