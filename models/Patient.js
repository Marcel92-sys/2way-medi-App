const mongoose = require('mongoose');

const patientSchema =  new mongoose.Schema({
    name:{type: String},
    surname: {type: String},
    age:{type: Number},
    gender: {type: String},
    height:{type: Number},
    password:{type: String},
    weight:{type: Number},
    bmi:{type: Number},
    ward:{type: String, default: 'Ningo'},
    lga:{type: String, default: 'Akwanga'},
    state:{type: String, default: 'Nasarawa'},
    picture:{type: String, },
    encounter:[{
        date:{ type: Date, default: Date.now()},
        visitType:{},
        weight:{type: Number},
        height:{type: Number},
        bmi:{type: Number},
        bloodPressure:{type: Number},
        temperature:{type: Number},
        respiratoryRate:{},
        complaint:{type: String},
        diagnosis:{type: String, enum: ['Malaria', 'Hypertension','Pneumonia', 'Diabetes']},
        treatmentPlan:{type: String},
        heldBy:{type: mongoose.Schema.Types.ObjectId, ref:'HealthWorker', required:"Who is making this encounter"}

    }]
})


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;