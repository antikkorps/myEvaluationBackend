require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' });
});

// require('./app/routes/myEvaluation.routes')(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
require('./routes/evaluations.routes')(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
