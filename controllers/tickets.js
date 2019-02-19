var Ticket = require('../models/ticket');
var Flight = require('../models/flight');


module.exports = {
  new: newTicket,
  create: createTicket
}

function newTicket(req, res) {
  console.log(req.params.id)
  res.render('tickets/new', {
    title: 'New Ticket',
    idNum: req.params.id
  });
}

function createTicket(req, res) {
  console.log(req.body)
  req.body.flight = req.params.id;
  Ticket.create(req.body, (err, ticket) => {
    console.log(ticket, 'MIRZA')
    Flight.findById(req.params.id, (err, flight) => {
      flight.tickets.push(ticket);
      flight.save();
      console.log(flight, 'SON')
      res.redirect(`/flights/${req.params.id}`)
    })
  })
}