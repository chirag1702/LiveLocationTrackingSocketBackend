const express = require('express');
const http = require('http');
const socket = require('socket.io');
app = express();
server = http.createServer(app);
const io = socket(server);
app.get("/", (req, res) => {
	res.send("chat server is running on port 8000");
});

let tripDetails = [];

io.on('connection', socket => {
	console.log("user connected!!");
	socket.on('start_trip', (bookingID) => {
		console.log("driver started trip ", bookingID);
	});

	socket.on('disconnect', (bookingID) => {
		console.log("driver disconnected from trip ", bookingID);
	});
});

server.listen(8000, () => {
	console.log("server is running on port 8000");
});