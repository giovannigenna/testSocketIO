var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var TimerClass = require('./Timer');
var PlayerClass = require('./Player');

var players = [];


Timer = new TimerClass();

Timer.setTime(100);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    var player = new PlayerClass(socket.id);
    players.push( player );

    socket.on('disconnect', function () {

        console.log('user disconnected: ' + socket.id);
    });

    socket.on('login', function ( name ) {
        // Setto il nome al player
        player.setName( name );

        // Avviso tutti gli utenti
        io.emit('players', players);

        console.log('--> User logged as: ' + name );
    });

    socket.on('start', function (msg) {
        Timer.setTime(100);
        Timer.start(
            function (time) {
                io.emit('gameTime', time);
            },
            function () {
                console.log("FINEEE");
            }
        )
    });


});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
