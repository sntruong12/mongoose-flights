var Flight = require('../models/flight');

module.exports = {
  create
};

function create(req, res) {
  Flight.findById(req.params.id, (err, flight) => {
    flight.destinations.push(req.body);
    console.log(req.body);
    flight.save(err => {
      res.redirect(`/flights/${flight._id}`);
    })
  })
}