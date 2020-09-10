const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     client.broadcast.emit('enviarMensaje', data);

    //     // if (mensaje.usuario) {
    //     //     callback({
    //     //         resp: 'TODO SALIO BIEN!'
    //     //     });

    //     // } else {
    //     //     callback({
    //     //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     //     });
    //     // }
    // });

    client.emit('estadoActual', {
        ticket: ticketControl.getUltimoT(),
        cuatroU: ticketControl.getUltimosT()
    });

    client.on('siguienteT', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);

    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es necesario.'
            });
        }

        let ticket = ticketControl.atenderT(data.escritorio);

        client.broadcast.emit('ultimos', {
            cuatroU: ticketControl.getUltimosT()
        });

        callback(ticket);

    });

});