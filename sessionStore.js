class InMemorySessionStore extends SessionStore {
    constructor( ) {
        super();
        this.sessions = new Map();

    }

    findSession(id) {
        return this.session.get(id);
    }

    saveSession(id, session) {
        this.sessions.set(id, session)
    }

    findAllSessions() {
        return [...this.session.values()]
    }
}


// //         // listing users
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
