module.exports = (app) => {
  const roles = require('../controllers/role.controller.js');
  const router = require('express').Router();

  //create a new role
  router.post('/', roles.create);

  //retrieve all roles
  router.get('/', roles.findAll);

  //retrieve a single role with id
  router.get('/:id', roles.findOne);

  //update a role with id
  router.put('/:id', roles.update);

  //delete a role with id
  router.delete('/:id', roles.delete);

  //delete all roles
  router.delete('/', roles.deleteAll);

  app.use('/api/v1/roles', router);
};
