var express = require('express')
var router = express.Router()

//Customer Model 
const Customer = require('../models/Customer');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time Customer Route has been used: ', Date.now())
  next()
})
// define the home page route
router.get('/list', function (req, res) {
  res.send('List customers here');
})
// define the about route
router.get('/:id', function (req, res) {
  res.send('get a specific customer')
}); 

// rest of crud bits

module.exports = router;