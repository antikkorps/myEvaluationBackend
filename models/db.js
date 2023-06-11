const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

//create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  database: dbConfig.DATABASE,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
});

//open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// Exportez la connexion pour l'utiliser dans d'autres fichiers
module.exports = connection.promise();
