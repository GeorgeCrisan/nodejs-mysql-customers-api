//Import Main Modules
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser')();
const Knex = require('knex');
const { Model } = require('objection');


//Customer Model and Router
const customerRouter = require('./Routes/CustomerRouter');
const app = express();

app.use(cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: false }));

//Import Configs (to be moved in .nev)
const { mysqlDbConfig } = require('./config');

//Settings
const PORT = process.env.PORT ? process.env.PORT : 8383;


// Initialize knex.
const db = Knex({
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
Model.knex(db);


app.get("/", async (req, res) => {
  try {
    let data =await db.select("*").from('members');
    res.json({ data: data });
  } catch(error) {
    res.json({ message: "Api error", error: error });
  }
});

app.use('/customer/', customerRouter);

app.get("*", async (req, res) => {
  res.json({ message: "Nothing here. Try an existing route instead?" });
});

app.listen(Number(PORT), () => console.log(`Server is up an runing on port: ${PORT}`));
