const express = require('express');
const route = require('./routes/route')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')

const app = express()

app.use(bodyParser.json());// it helps in identify incoming json Object
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer().any()) // It helps us to upload media file like pdf , jpg



mongoose.connect("mongodb+srv://DivyaShakti:Divy1234@cluster0.9bqh4.mongodb.net/TodoApp?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(()=>
    console.log("MongoDb Connected Successfully")

).catch(err => console.log(err))

app.use('/', route)


app.listen(process.env.PORT || 3000, function(){
    console.log("Express running on this port" + (process.env.PORT || 3000))
});