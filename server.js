const express = require('express');
const mongoose = require('mongoose');
const userData = require('./model');
const app = express();

mongoose.connect("mongodb+srv://loginsa80_db_user:JahDfkUyWSRqIjTs@cluster0.oo49k08.mongodb.net/")
.then(()=>console.log("database conneted"))
.catch((err)=> console.log(err.message))

app.listen(3000, ()=> console.log("server is running...."))