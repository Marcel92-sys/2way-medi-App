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

// middleware to check for auth and allow connection


// io.use((socket, next) => {
//     const name = socket.handshake.auth.name;
//     if (!name) {
//         return next(new Error("invalid user"))

//     }
//     socket.name = name;
//     next()
// #leave commented
//     const sessionID = socket.handshake.auth.sessionID;
//     if (sessionID) {
//         // finding existing session
//         const session = sessionStore.findSession(sessionID)
//         if(session) {
//             socket.sessionID = sessionID;
//             socket.userID = session.userID;
//             socket.username = session.username;
//             return next();
//         }
//     }
//     const surname = socket.handshake.auth.surname;

//     if (!surname) {
//         return next(new Error("invalid surname"))
//     }
//     // creating new session
//     socket.sessionID = randomId();
//     session.userID = randomId
//     socket.surname = surname;
//     next();
// })
// #stop commenting
// })
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
            console.log(typeof(data))
            socket.emit("sendToClient", data)
        }
        
        )

        socket.on("send-encounter", (data) => {
            console.log("data from sent encounter:", data)
        })
        
//         // listing users
//         const users = [];

//         // fetching message list upon connection
//         const messagesPerUser = new Map();

//         messageStore.findMessageForUser(socket.userID).forEach((message) => {
//             const {from, to } = message;
//             const otherUser = socket.UserID === from ? to : from;

//             if (messagesPerUser.has(otherUser)) {
//                 messagesPerUser.get(otherUser).push(message)
//             } else {
//                 messagesPerUser.set(otherUser, [message]);
//             }
        })

//         sessionStore.findAllSessions().forEach((session) => {
//             users.push({
//                 userID: session.userID,
//                 username: session.username,
//                 connected: session.connected,
//                 messages: messagesPerUser.get(sessionID) || [],

//             });
//         });
        
//         for (let [id, socket] of io.of('/').sockets) {
//             users.push({
//                 userID: id,
//                 username: socket.surname
//             });
//         }
//         socket.emit("users", users)

//         // notify existing users
//         socket.broadcast.emit("user connected", {
//             userID: socket.id,
//             username: socket.username
//         })

//         // recieve message from clientside
//         socket.on("private message", ({content, to}) => {
//             const message = {
//                 content,
//                 from: socket.userID,
//                 to
//             }
//             socket.to(to).to(socket.userID).emit("private message", message);
//             messageStore.saveMessage(message);
//         } )

//         // sending session to clientEnd
//         socket.emit("session", {
//             sessionID: socket.sessionID,
//             userID : socket.userID
//         });

//         // make socket join associated room

//         socket.join(socket.userID)

//         // recieve disconnect trigger
//         socket.on("disconnect", async () => {
//             const matchingSockets = await io.in(socket.userID).allSockets()
//             const isDisconnected = matchingSockets.size === 0;

//             if(isDisconnected) {
//                 // notify other users
//                 socket.broadcast.emit("user disconnected", socket.user)

//                 // update connection status of the session
//                 sessionStore.saveSession(socket.sessionID, {
//                     userID: socket.userID,
//                     username: socket.username,
//                     connected: false,
//                 });
//             }
//         })

    



// db
const URI = `mongodb+srv://${process.env.PASSWORD}@cluster0.fgvd4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose.connect(URI, {
    useNewUrlParser: true, useUnifiedTopology: true})
   
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:') )

db.once('open', () =>  console.log("Db connected"))

// routes
app.use('/v1/login', loginRoute);
app.use('/v1/workers', workerRoute);
app.use('/v1/patients', patientRoute);
app.get('/', (req,res) => {
    res.send("It works")
} )


// server
server.listen(port, () => console.log(`Server started on http://localhost:${port}`))

