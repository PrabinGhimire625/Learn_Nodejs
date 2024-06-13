const express = require("express");
const app = express();
const db = require("./db"); //export db.js file here
const menu = require("./models/menu");
require('dotenv').config();
const port = process.env.port || 3000;   //.env file defined port or local port 3000


//parser the JSON data into javascript object
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

//import the router files from 
const userRoutes= require('./routes/userRoutes')
const menuRoutes=require('./routes/menuRoutes')

//use the routers
app.use('/user', userRoutes)
app.use('/menu',menuRoutes)

//run in the port
app.listen(port, () => {
  console.log(`An app is listening on port http://localhost:${port}`);
});
