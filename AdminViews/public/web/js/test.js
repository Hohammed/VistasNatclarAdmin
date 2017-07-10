/*
Primer Ejemplo: Crear Servidor
var http = require('http');
http.createServer(function (peticion, respuesta) {
    respuesta.writeHead(200, { 'Content-Type': 'text/plain' });
    respuesta.end('Sitio Servido por Node.js\n');
}).listen(3012, "127.0.0.1");

console.log("Server corriendo en http://127.0.0.1:3012");


var express = require('express');
	app = express();

var port = process.env.PORT || 8080;
var io = require('socket.io').listen(app.listen(port));
app.use(express.static(__dirname + '/prueba'));

var secret = 'admin';

var presentation = io.on('connection', function(socket){

	socket.on('load', function(data){
		socket.emit('access', {
			access: (data.key === secret ? "granted" : "denied")
		});
	});

	socket.on('message',function(data) {
      console.log('Received a message from the server!',data);
    });

	socket.on('click', function(data){
		if (data.key === secret){
			presentation.emit('setText', {
				hash: data.hash
			});
		}
	});

});

console.log("Tu servidor esta corriendo en http://localhost:" + port);*/


var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Loading socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, username) {
    
    socket.emit('message', 'Estás conectado!');
    
    socket.broadcast.emit('message', 'Otro cliente se conecto!');

    
    socket.on('little_newbie', function(username) {
        socket.username = username;
    });

    
    socket.on('message', function (message) {
        console.log(socket.username + ' dice: ' + message);
    });

    socket.on('sendAction', function(accion){
    	socket.accion = accion;
    });
});




server.listen(8080);