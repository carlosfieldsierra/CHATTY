/*
    Name: Tony Tavera-Reyes
    Assignment: PA 8
    Discription: This is the server javascript file, which communicates with the
    main js file and the server to be able to create changes to the HTML.
    THis is reponsive and use a link to be able to be set live.
 */
// required uses of modules for server to work
const express = require("express")
const mongoose = require("mongoose");
const parser = require("body-parser");
const app = express()
app.use(parser.json() );
const port = 3000
const hostname = "";
const db = mongoose.connection;
app.use(parser.urlencoded({ extended: true }));

// server uses of mongo
const mongoDBURL = 'mongodb://127.0.0.1/chatApp';
var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({time: Number,
  alias: String,
  message: String
});
mongoose.connect(mongoDBURL,{useNewUrlParser:true});
db.on('error',console.error.bind(console,"MongoDB connection error"));


const daddy = "msjksjsj";
function RunServer (){
    
    app.use(express.static("public_html")) 
    // from file get the chats that have been formated
    app.get('/chats',(req,res)=>{
       
        var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );
        ChatMessage.find({}).exec(function(error,results){
            res.send(JSON.stringify(results))})
    })
    
    app.post('/chats/post', (req, res) => {
        var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );
        const data =  JSON.parse(req.body.data);
        // saves the data and a dictionairy of the new messages
        var saveTheData =  new ChatMessage({
            alias:data.alias,
            time:data.time,
            message:data.message,
        })

        saveTheData.save((err)=>{})
    });
    app.listen(port,()=>
    console.log("http://143.198.168.218:3000/")
    )
}
RunServer();
