var express = require('express');
var router = express.Router();

/* Redirect root to /flights */
router.get('/', function(req, res, next) {
  res.redirect('/flights');
});

module.exports = router;
