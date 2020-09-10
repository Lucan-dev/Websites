var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();

var server = app.listen(4000, function() {
    console.log('Listening to requests on port 4000.');
});

// Static files
app.use(express.static('./'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket) {
    console.log('Made socket connection id:', socket.id)

    // Handle chat event
    socket.on('chat', function(data) {
        io.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(handle) {
        socket.broadcast.emit('typing', handle);
    });
});
