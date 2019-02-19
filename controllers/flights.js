var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
  index,
  new: newFlight,
  create,
  show
}

function index(req, res) {
  Flight.find({})
    .sort({
      departs: -1
    })
    .exec((err, flights) => {
      res.render('flights/index', {
        title: 'All Flights',
        flights
      })
    })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'New Flight',
  })
}

function create(req, res) {
  for (var key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key];
    }
  }
  console.log(req.body);
  var flight = new Flight(req.body);
  flight.save(err => {
    return err ? res.render('flight/new') : res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.id, (err, flight) => {
    Ticket.find({flight: flight._id}, (err, tickets) => {
      console.log(tickets);
      res.render('flights/show', {
        title: 'Flight Information',
        flight,
        tickets
      })
    })
  })
}