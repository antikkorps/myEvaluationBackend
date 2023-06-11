const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

//create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  name: dbConfig.NAME,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
});

//open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

module.exports = connection;
