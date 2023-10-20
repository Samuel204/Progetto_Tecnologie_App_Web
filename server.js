const express = require('express');
/**
 * @type {Mongoose}
 */
const mongoose = require('mongoose')
var bodyParser=require("body-parser");

mongoose.connect('mongodb+srv://usertaw:userpass@tawdb.1oresjm.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connessione a MongoDB avvenuta con successo');
  })
  .catch((err) => {
    console.error('Errore nella connessione a MongoDB: ' + err);
  });

var db=mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
  console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/registrazione', function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var role =req.body.role;

  var data = {
    "name": username,
    "password":password,
    "role": role
  }
  db.collection('details').insertOne(data,function(err, collection){
    if (err) throw err;
    console.log("Record inserted Successfully");

  });

})





console.log("server listening at port 3000");


