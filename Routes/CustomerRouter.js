var express = require('express');

// rest of crud bits

module.exports = function (db) {
  var router = express.Router();
  //Customer Model 
  const Customer = require('../models/Customer');

  // middleware that is specific to this router
  router.use(function timeLog(req, res, next) {
    console.log('Time Customer Route has been used: ', Date.now())
    next()
  })
  // define the home page route
  router.get('/list', async function (req, res) {
    try {
      let data = await db.db.select("*").from('customers');
      res.json({ data: data });
    } catch (error) {
      res.json({ message: "Api error", error: error });
    }
  })
  // define the about route
  router.get('/:id', function (req, res) {
    res.send('get a specific customer')
  });

  return router;

}