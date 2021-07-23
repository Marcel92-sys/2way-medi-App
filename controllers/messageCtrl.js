const HealthWorker = require("../models/HealthWorker")

const sendToClient = async(message, from, to) => {

    
    try {
        let pSender = await Patient.findOne(from)

        let pReciever = await Patient.findOne(to)

        if (!Sender) {
            await HealthWorker.findOneAndUpdate({_id:from,})
        }
    }catch(err) {

        console.log(err)
    }

}

module.exports = sendToClient