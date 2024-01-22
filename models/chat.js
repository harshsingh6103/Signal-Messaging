const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema({
    from:{
        type: String,
        required:true
    },
    to:{
        type: String,
        required:true
    },
    message:{
        type: String,
        maxLength:50 //constraint
    },
    date:{
        type: Date,
        required:true
    },
})



const Chat = mongoose.model("Chat",chatSchema);    //will create db with chats

module.exports=Chat;