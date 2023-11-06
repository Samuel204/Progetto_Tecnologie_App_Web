import dotenv from 'dotenv';
const express = require('express');
const app=express()
/**
 * @type {Mongoose}
 */
const mongoose = require('mongoose')
mongoose.set('strictQuery',false);
const routes =require("./route/routes");
const cors =require('cors');
dotenv.config();

app.use(express.json());
app.use(routes);

app.use(cors(
  {origin: "http://localhost:4200" }
));

/*
app.use((err,req,next)=>{
  const statusCode= err.status || 500;
  const errorMessage =err.message || "Something went wrong!";
  return res.status(statusCode).json({
    success:false,
    status: statusCode,
    message: errorMessage,
    stack: err.stack
  })
});*/

mongoose.connect("mongodb+srv://usertaw:userpass@tawdb.1oresjm.mongodb.net/dbRestaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connessione a MongoDB avvenuta con successo');
  })
  .catch((err) => {
    console.error('Errore nella connessione a MongoDB: ' + err);
  });


