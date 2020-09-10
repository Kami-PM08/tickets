var socket = io();

var lblT1 = $('#lblTicket1');
var lblT2 = $('#lblTicket2');
var lblT3 = $('#lblTicket3');
var lblT4 = $('#lblTicket4');
var lblE1 = $('#lblEscritorio1');
var lblE2 = $('#lblEscritorio2');
var lblE3 = $('#lblEscritorio3');
var lblE4 = $('#lblEscritorio4');

var lblT = [lblT1, lblT2, lblT3, lblT4];
var lblE = [lblE1, lblE2, lblE3, lblE4];

socket.on('estadoActual', function(res) {
    actualizar(res.cuatroU);
});

socket.on('ultimos', function(res) {
    if (res.cuatroU !== 'No hay tickets.') {
        var audio = new Audio('audio/new-ticket.mp3');
        audio.play();
    }

    actualizar(res.cuatroU);
});

function actualizar(cuatroU) {
    for (var i = 0; i < cuatroU.length; i++) {
        lblT[i].text('Ticket ' + cuatroU[i].numero);
        lblE[i].text('Escritorio ' + cuatroU[i].escritorio);

    }
}