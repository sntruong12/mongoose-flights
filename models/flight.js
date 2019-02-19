var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DAL', 'LAX', 'SEA']
  },
  arrival: Date
}, {
  timestamps: true
});

var flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'SouthWest', 'United']
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true
  },
  departs: {
    type: Date,
    default: function() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var futureD = new Date(year + 1, month, day, hours, minutes, seconds);
      return futureD;
    }
  },
  airport: {
    type: String,
    enum: ['AUS', 'DAL', 'LAX', 'SEA'],
    default: 'SEA'
  },
  destinations: [destinationSchema],
  tickets: [{
    type: Schema.Types.ObjectId,
    ref: 'Ticket'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);