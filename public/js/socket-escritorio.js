var socket = io();

var searchParams = new URLSearchParams(window.location.search);

var label = $('small');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario.');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {
        label.text(res);
    });
});