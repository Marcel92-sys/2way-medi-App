const HealthWorker = require("../models/HealthWorker");
const Patient = require("../models/Patient")
const crypto = require('bcryptjs')


// login controller
const loginUser = async(req, res) => {
    
let isPatient =await Patient.findOne({surname: req.body.surname});
let isWorker = await HealthWorker.findOne({surname: req.body.surname});
    console.log(typeof(isWorker))
    // checks if 
    if(isPatient) {

        if(crypto.compareSync(req.body.password, isPatient.password)) {
            res.send({
                id:isPatient._id,
                name:isPatient.name,
                surname: isPatient.surname,
                bmi:isPatient.bmi

            })
        } else{
            res.send("Incorrect Password")
        }
    
    } else if(isWorker) {
        
        if(crypto.compareSync(req.body.password, isWorker.password)){
            res.send({
                id: isWorker.id,
                name:isWorker.name, 
                surname:isWorker.surname, 
                department: isWorker.department})
        }
    }
     else {
        res.send("There's no user with that name, do create an account.")
    }

}

module.exports = loginUser