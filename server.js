/*
 * Author: Carlos Field-Sierra
 * Description: This acts as the server for the website
 * and sends back the text translated 
 */
// Imports
const express = require("express")
const readline = require('readline');
const mongoose = require("mongoose");
const fs = require("fs") // read file
const parser = require("body-parser");

// Instances
const app = express()
app.use(parser.json() );
app.use(parser.urlencoded({ extended: true }));
const port = 3000
const db = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/chatty';


// Setup schema
var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );




// Set up mongoose connection
mongoose.connect(mongoDBURL,{useNewUrlParser:true});
db.on('error',console.error.bind(console,"MongoDB connection error"));

// Server logic
app.use(express.static("public_html")) // <--when ever a path matches a file in that folder send it 


// Get request to /chats gets all messages from mongodb <-- client should get every 1 second
app.get('/chats',(req,res)=>{
    var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );
    ChatMessage.find({
    }).exec(function(error,results){
        res.send(JSON.stringify(results));
    })
})
// Post /chats/post will have an alias and message 
app.post('/chats/post', (req, res) => {
    var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );
    const msg =  JSON.parse(req.body.message);
    
    var data =  new ChatMessage({
        time:msg.time,
        alias:msg.alias,
        message:msg.message,
    })
    
    data.save(function (err){
        if (err){
            console.log("error")
        } 
    })

});



// Listen for port
app.listen(port,()=>
console.log(`Example app listening at http://localhost:${port}`)
)