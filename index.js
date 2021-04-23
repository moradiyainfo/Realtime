var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var numClients = 0;

io.on('connection', function (socket) {
    numClients++;
    io.emit('stats', { numClients: numClients });

    console.log('Connected clients:', numClients);

    socket.on('disconnect', function () {
        numClients--;
        io.emit('stats', { numClients: numClients });

        console.log('Connected clients:', numClients);
    });
});

server.listen(8081);