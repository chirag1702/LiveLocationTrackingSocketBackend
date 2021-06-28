const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

app.get('/', (req, res) => {
    res.send('you are on home route of realtime-location-tracking-socket-io-config');
});

io.on('connection', socket => {
    socket.join(socket.request._query.booking_id);

    socket.on('driver_location_update', location => {
        socket.to(socket.request._query.booking_id).emit('location_sent_back', location);
    });

    socket.on('disconnect', () => {
        console.log('user left');
    });
});

server.listen(6000, () => {
    console.log('realtime-location-tracking-socket-io-config running on port 6000');
});
