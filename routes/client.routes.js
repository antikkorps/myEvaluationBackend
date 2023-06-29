module.exports = (app) => {
    const clients = require('../controllers/client.controller.js');
    const router = require('express').Router();
  
    //create a new client
    router.post('/', clients.create);
  
    //retrieve all clients
    router.get('/', clients.findAll);
  
    //retrieve all published clients
    router.get('/published', clients.findAllPublished);
  
    //retrieve a single client with id
    router.get('/:id', clients.findOne);
  
    //update a client with id
    router.put('/:id', clients.update);
  
    //delete a client with id
    router.delete('/:id', clients.delete);
  
    //delete all clients
    router.delete('/', clients.deleteAll);
  
    app.use('/api/v1/clients', router);
};