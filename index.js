const express = require('express');
const cors = require('cors');

const socketio = require('socket.io');
const http = require('http');


const PORT = process.env.PORT || 5000


const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());

app.get('/', (req, res)  => res.status(200).send(`server has been started on ${PORT}`))
app.get('/broadcast-added', (req, res, next) => {
    io.to('broadcastMessage').emit('notify');

    return res.status(200).send();
})

io.on('connection', socket => {
    socket.join('broadcastMessage');
})

// app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});