const mongoose = require("mongoose");
const Chat = require("./models/chat.js");  // requiring chat schema from mongoose
main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/signal');
}


let chats = [{
    from: "shilpa",
    to: "shweta",
    message: "kaisa gya paper",
    date: new Date()
},
{
    from: "prince",
    to: "abhishek",
    message: "hello bhaiya ji",
    date: new Date()
},
{
    from: "shubham",
    to: "saurabh",
    message: "kya haal chal hai",
    date: new Date()
},
{
    from: "ayush",
    to: "atharv",
    message: "kya chahiye",
    date: new Date()
}]

Chat.insertMany(chats);

// let chat1 = new Chat({
//     from: "harsh",
//     to: "harshita",
//     message: "wassup",
//     date: new Date()
// })

// chat1.save().then((res)=>{
//     console.log(res);
// });


