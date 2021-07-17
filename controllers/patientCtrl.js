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
}

// Sorting patients by age, gender and BMI
const sort = async(req,res) => {    
    const filter = req.query
    if (filter.hasOwnProperty('gender')) {
            // sort patients by gender
            const male = filter.gender === "male"
            const female = filter.gender === "female"
            if (male) {
                const patients = await Patient.find({gender:'M'})
                res.send(patients)    
            } else if (female) {
                const patients = await Patient.find({gender: 'F'})
                res.send(patients)
                
            } else{
                res.send("Invalid search!")
            }
        
            // sorting patients by age
    } else if (filter.hasOwnProperty('age')) {
       
            const levelOne = '0 - 29';
            const levelTwo = '30 - 59';
            const levelThree = '60 - 89';
            const levelFour = '90 and above';
                //age bracket 0 - 29
                if (filter.age == levelOne) {
                    const patients = await Patient.find({age: {$lte :29, $gte: 0}});
                   
                    res.send(patients)
                } else if (filter.age == levelTwo) {
                    // age bracket 30 - 59;
                    const patients = await Patient.find({age: {$lte :59, $gte: 30}})
                                       res.send(patients)
                } else if (filter.age == levelThree) {
                    // age bracket 60 - 89;
                    const patients = await Patient.find({age: {$lte :89, $gte:  60}})
                                       res.send(patients)
                } else if (filter.age == levelFour) {

                    // age bracket 90 and above;
                    const patients  = await Patient.find({age:{$gte: 90}})
                                       res.send(patients)
                } else {
                    res.send("Invalid search!")
                }
        // filter by BMI 
    } else if (filter.hasOwnProperty('bmi')) {
       
         const levelOne = 'below 18.5';
         const levelTwo = '18.5 - 24.9';
        const levelThree = '25.0 - 29.9';
         const levelFour = '30.0 and above';

        if (filter.bmi == levelOne) {
            // below 18.5
             const patients = await Patient.find({bmi: {$lt: 18.5 }});
             res.send(patients)
             
        } else if(filter.bmi == levelTwo) {
            //  18.5 - 24.9 
              const patients  = await Patient.find({bmi: {$lte :24.9, $gte:18.5 }});
                res.send(patients)

        } else if (filter.bmi == levelThree) {
            // 25.0 - 29.9
              const patients  = await Patient.find({bmi: {$lte :29.9, $gte: 25.0}});
             
              res.send(patients)      
        } else if( filter.bmi == levelFour) {
            //  30.0 and above
              const patients  = await Patient.find({bmi: { $gte: 30}});
             
              res.send(patients)
        } else {
            res.send("Invalid search!")
        }
           
    } else{
        res.send("Invalid search!")
            }
    
}


module.exports = {registerPatient, loginPatient, getPatients, sort}