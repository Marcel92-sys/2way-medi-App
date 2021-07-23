const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
     content:{type:String, required},
     from:{type: String },
     to:{type:String},
     date:{type: Date}
   
})

const Message =  mongoose.model("Message", messageSchema);

module.exports = Message;