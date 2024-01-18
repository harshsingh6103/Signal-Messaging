const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
app.use(express.static(path.join(__dirname, "public")));
const methodOverride = require("method-override");


const Chat = require("./models/chat.js");  // requiring chat schema from mongoose

app.use(express.urlencoded({extended:true})); // require to parse post body

 app.use(express.static(path.join(__dirname, "views")));
app.set("view engine","ejs");
app.use(methodOverride("_method"));


main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/signal');
}

//Index Route

app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats})
})

//New Route 
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})


//Create Route
app.post("/chats",(req,res)=>{
    let {from,to,message} = req.body;
    let newChat= new Chat({
        from:from,
        to:to,
        message:message,
        date: new Date(),

    })
newChat.save().then(res=>{
    console.log("chat saved")
}).catch(err=>{
    console.log(err);
})
    
res.redirect("/chats")
})

// Edit Route
app.get("/chats/:id/edit", async (req,res)=>{
    let{id}= req.params;    //to get anything from url
  let chat =  await Chat.findById(id);
     res.render("edit.ejs",{chat})
})

// Update Route
app.put("/chats/:id",async(req,res)=>{
    let{id}= req.params;
    let { message : newMsg } = req.body;   // or {message}    // from edit form name="msg" 15
    let updatedChat =  await Chat.findByIdAndUpdate(
        id,
        {message : newMsg},   // or {message}
        {runValidators:true, new:true});
        console.log(updatedChat)
        res.redirect("/chats");

})


// Delete Route
app.delete("/chats/:id",async(req,res)=>{
    let{id}= req.params;
    let deletedChat =  await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
        res.redirect("/chats");

})



app.get("/",(req,res)=>{
    res.send("At root")
})

app.listen(8080,()=>{
    console.log("Server is live locally at 8080");
})



