const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const workerRoute = require('./routes/hWorkerRoute')
const patientRoute = require('./routes/patientRoute')

dotenv.config();

const app = express();
const port = process.env.PORT || 5700

// 
// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());


// db
const URI = `mongodb+srv://${process.env.PASSWORD}@cluster0.fgvd4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose.connect(URI, {
    useNewUrlParser: true, useUnifiedTopology: true})
   
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:') )

db.once('open', () =>  console.log("Db connected"))

// routes
app.use('/v1/workers', workerRoute);
app.use('/v1/patients', patientRoute);
app.get('/', (req,res) => {
    res.send("It works")
} )


// server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`))