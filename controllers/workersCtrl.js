const crypto = require('bcryptjs')
const HealthWorker = require('../models/HealthWorker');
const generateToken = require('./auth');

// register a new healthWorker
const register = async(req, res) => {
    
    let name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);

    let surname = req.body.surname.charAt(0).toUpperCase() + req.body.surname.slice(1);;
    let department = req.body.department.charAt(0).toUpperCase() + req.body.department.slice(1);
    
    let cadre = req.body.cadre.charAt(0).toUpperCase() + req.body.cadre.slice(1);
    try {
        const existingUser = await HealthWorker.findOne({name: name,surname: surname,cadre: cadre, department: department})

        if(existingUser){
            res.send("A user with these credentials already exist.")
        } else{ 
        let worker = req.body
        worker.password = crypto.hashSync(worker.password, 10)
        // const token =  generateToken(worker)
        // console.log(token)
        
        const newWorker = new HealthWorker(worker)
        const user = await newWorker.save();
    
        console.log(user)
        res.send(`New user ${user.name} has been created.`)
        // // const token =  generateToken(user)
        // res.send({name: user.name, 
        //             surname: user.surname,
        //             token
        //         })
       
        }        
        
    } catch (error) {
        console.log(error)
        
    }
};


const getWorkers = async(req,res) => {
    const users = await HealthWorker.find({});

    res.send(users)
    console.log(users.length)
}

module.exports = {register, getWorkers}