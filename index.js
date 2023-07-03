require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
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

require('./routes/evaluation.routes')(app);
require('./routes/contrat.routes')(app);
require('./routes/role.routes')(app);
require('./routes/client.routes')(app);
require('./routes/user.routes')(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
require('./routes/evaluation.routes')(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
