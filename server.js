//Import Main Modules
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser')();
const mysql = require('mysql');


//Import Configs
const {mysqlDbConfig} = require('./config');

//Settings
const PORT = process.env.PORT ? process.env.PORT : 8383;



const mysqlConnection = mysql.createConnection({
  host: mysqlDbConfig.HOST,
  user: mysqlDbConfig.USER,
  password: mysqlDbConfig.PASSWORD,
  database: mysqlDbConfig.DB,
  port: PORT,
});

mysqlConnection.connect((error,connection)=>{
  if(error){
    console.log('Error connection db', error);
    } 
    console.log(connection);
    console.log('Connected to the db!');
});

const app = express();

app.use(cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: false }));

app.get("/", (req, res)=>{
  res.json({message: "My api is up..."});
})

app.listen(Number(PORT), () => console.log(`Server is up an runing on port: ${PORT}`));
