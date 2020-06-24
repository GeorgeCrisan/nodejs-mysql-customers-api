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
  //http://localhost:8383/customer/id/173

  router.get('/id/:id', async function (req, res) {
    console.log(req.params,'here');
    try{
    let data = await Customer.query().findById(req.params.id);
    res.json({ data: data });
  } catch (error) {
    res.json({ message: "Api error", error: error });
  }
  });

  router.get('/repsEmpoyees', async function (req, res) {
    console.log(req.params,'here');
    try{
    //To do Write a complex query to get all the representants empoyees for each customer
    res.json({ data: false });
  } catch (error) {
    res.json({ message: "Api error", error: error });
  }
  });

  return router;

}