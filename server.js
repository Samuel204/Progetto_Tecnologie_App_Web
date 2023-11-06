const dotenv =require ('dotenv');
const express = require('express');
const app=express()
/**
 * @type {Mongoose}
 */
const mongoose = require('mongoose')
mongoose.set('strictQuery',false);
const cors =require('cors');
const {router} = require("./route/routes.js");
dotenv.config();

app.use(express.json());
app.use(router);

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

mongoose.connect("mongodb+srv://865173:userpass@cluster0.lbg8lhz.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connessione a MongoDB avvenuta con successo');
  })
  .catch((err) => {
    console.error('Errore nella connessione a MongoDB: ' + err);
  });


