
module.exports = (server) => {
    const io = require('socket.io')(server)
    io.on('connection', (socket) => {

        socket.on('connection', data => {
            console.log(`here's the data:`, data)
        })
    })
}
