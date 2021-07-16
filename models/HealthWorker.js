const mongoose = require('mongoose');


const healthWorkerSchema = new mongoose.Schema({
     name:{type: String},
    surname: {type: String},
    password:{type: String},
    age:{type: String},
    gender: {type: String},
    cadre:{type: String, default: 'Doctor'},
    department:{type: String, default: 'Medicine'}
   
})

const HealthWorker =  mongoose.model("HealthWorker", healthWorkerSchema);

module.exports = HealthWorker;