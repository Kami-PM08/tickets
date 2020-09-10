const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {


    constructor() {
        this.hoy = new Date().getDate();
        let data = require('../data/data.json');
        if (this.hoy === data.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.cuatroU = data.cuatroU;

        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;

        let tickets = new Ticket(this.ultimo, null);
        this.tickets.push(tickets);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoT() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimosT() {
        return this.cuatroU;
    }

    atenderT(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets.'
        }
        let numeroT = this.tickets[0].numero;
        this.tickets.shift();

        let atendiendoT = new Ticket(numeroT, escritorio);
        this.cuatroU.unshift(atendiendoT);

        if (this.cuatroU.length > 4) {
            this.cuatroU.pop();
        }

        this.grabarArchivo();

        return `Ticket ${numeroT}`;

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.cuatroU = [];

        this.grabarArchivo();

        console.log('Sistema inicializado.');
    };

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            cuatroU: this.cuatroU
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
};

module.exports = {
    TicketControl
}