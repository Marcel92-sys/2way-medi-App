const crypto = require('bcryptjs')
const generateToken = require('./auth');
const Patient = require('../models/Patient')

// registers a patient after db query using name, surname and age
const registerPatient =  async(req,res) => {
    const user = req.body;
    user.name = req.body.name.charAt(0).toUpperCase() +req.body.name.slice(1)
    user.surname = req.body.surname.charAt(0).toUpperCase() +req.body.surname.slice(1)
    user.bmi =  user.weight/user.height
    user.password = crypto.hashSync(user.password, 8)
   
    try {
        
      const existingUser =  await Patient.findOne({name: user.name,surname:user.surname,age:user.age});
      if (!existingUser) {

          patient = new Patient(user)
            const newPatient = await patient.save()
            res.send(`New user ${newPatient.name} has been created.`)
                const patients = await Patient.find();
      } else{
            res.send("A user with these credentials already exist.")
      }
    } catch (error) {
        res.send(error.message)
    }
}

const loginPatient = async(req, res) => {
    console.log('you did hit here')
    patient = await Patient.findOne({})
    
    if(patient) {
        if(crypto.compareSync(req.password, patient.password)) {
            res.send()
        } else{
            res.send("Incorrect Password")
        }
    
    } else{
        res.send("There's no user with that name")
    }
}

const getPatients = async(req,res) => {
    const patients = await Patient.find();
    res.send(patients)
    console.log(patients.length)
}

// sort patients by gender
const searchByGender = async(req,res) => {
    const male = req.params.query.male
    if(male){
        const patients = await Patients.find({gender:'M'})
console.log(`males are  ${patients.length}`)
    } else{
        const patients = await Patients.find({gender:'F'})
        console.log(`females are  ${patients.length}`)
    }

}
module.exports = {registerPatient, loginPatient, getPatients,searchByGender}