module.exports = (app) => {
  const evaluations = require('../controllers/evaluation.controller.js');
  const router = require('express').Router();

  //create a new evaluation
  router.post('/', evaluations.create);

  //retrieve all evaluations
  router.get('/', evaluations.findAll);

  //retrieve all published evaluations
  router.get('/published', evaluations.findAllPublished);

  //retrieve a single evaluation with id
  router.get('/:id', evaluations.findOne);

  //update a evaluation with id
  router.put('/:id', evaluations.update);
  router.patch('/:id', evaluations.update);

  //delete a evaluation with id
  router.delete('/:id', evaluations.delete);

  //delete all evaluations
  router.delete('/', evaluations.deleteAll);

  app.use('/api/v1/evaluations', router);
};
