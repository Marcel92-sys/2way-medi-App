const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');


// socket.io connections
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin:"http://localhost:19006",
    },
});


const loginRoute = require('./routes/loginRoute')


const workerRoute = require('./routes/hWorkerRoute')
const patientRoute = require('./routes/patientRoute');
const chatting = require('./controllers/chats')


dotenv.config();

const port = process.env.PORT || 5700

// 
// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());

    io.on("connection", async(socket) => {
        console.log("Client connected")
        const users = []
        for (let [id, socket] of io.of("/").sockets ) {
            users.push({
                userID : id,
                username: socket.name
            });
        }

        // socket.emit("users", users)


        socket.on("messageSent", (data) => {
            console.log((data))
            socket.emit("sendToClient", data)
        }
        
        )

        socket.on("send-encounter", (data) => {
            console.log("data from sent encounter:", data)
        })
        
    })
    



// db
const URI = `mongodb+srv://${process.env.PASSWORD}@cluster0.fgvd4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose.connect(URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
   
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:') )

db.once('open', () => 
 console.log("Db connected")
 )

// routes
app.use('/v1/login', loginRoute);
app.use('/v1/workers', workerRoute);
app.use('/v1/patients', patientRoute);
app.get('/', (req,res) => {
    res.send("It works")
} )


// server
server.listen(port, () => console.log(`Server started on http://localhost:${port}`))

