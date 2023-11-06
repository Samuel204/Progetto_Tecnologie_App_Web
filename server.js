const express = require('express');
var app=express()
/**
 * @type {Mongoose}
 */
const mongoose = require('mongoose')
mongoose.set('strictQuery',false);
var routes =require("./route/routes");
var bodyParser=require("body-parser");
const cors =require('cors');
app.use(express.urlencoded({
  extended:true
}));

app.use(cors(
  {origin: "http://localhost:4200" }
));

/*
app.listen(3000,function check(err)
{
  if(err)
    console.log("error")
  else
    console.log("started")
});*/

var server = app.listen(9992, 'localhost', function () {

  console.log('Server listening at http://' +  server.address().port);
});

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
/*
var db=mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
  console.log("connection succeeded");
})*/

app.use(express.json());
app.use(routes);


