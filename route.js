/**
 * Created by Andreea on 26.11.2016.
 */
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000);

app.use("/node_modules", express.static('node_modules'));
app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.set(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});

io.sockets.on('connection', function(socket){
    socket.on('send message', function(data){
        io.sockets.emit('new message', data);
    });
});