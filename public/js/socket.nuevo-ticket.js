var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor.');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor.');
});

socket.on('estadoActual', function(res) {
    label.text(res.ticket);
});

$('button').on('click', function() {
    socket.emit('siguienteT', null, function(res) {
        label.text(res);
    });

});