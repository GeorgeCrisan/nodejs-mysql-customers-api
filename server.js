//Import Main Modules
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser')();
const Knex = require('knex');
const { Model } = require('objection');

const Customer = require('./models/Customer');

const app = express();

app.use(cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: false }));

console.log(Customer);

//Import Configs
const { mysqlDbConfig } = require('./config');

console.log(mysqlDbConfig);

//Settings
const PORT = process.env.PORT ? process.env.PORT : 8383;


// Initialize knex.
const knex = Knex({
  client: 'mysql',
  connection: {
    host: mysqlDbConfig.HOST,
    database: mysqlDbConfig.DB,
    user:     mysqlDbConfig.USER,
    password: mysqlDbConfig.PASSWORD,
    options: {
      port: mysqlDbConfig.PORT
    }
  },
  debug: true,
  pool: {
    min: 2,
    max: 10,
    afterCreate: (conn, done) => {
      console.log('Connection made!');
        done(false, conn)
      }
  }
});

// Give the knex instance to objection.
Model.knex(knex);




app.get("/", async (req, res) => {
  try {
    let data =await knex.select("*").from('members');
    res.json({ data: data });
  } catch(error) {
    res.json({ message: "Api error", error: error });
  }
});

app.get("*", async (req, res) => {
  res.json({ message: "Nothing here. Try an existing route instead?" });
});

app.listen(Number(PORT), () => console.log(`Server is up an runing on port: ${PORT}`));
