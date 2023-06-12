const Evaluation = require('../models/evaluation.model.js');

//create and save a new evaluation
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  //create an evaluation
  const evaluation = new Evaluation({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    // date: req.body.date,
    // type: req.body.type,
    // status: req.body.status,
    // user_id: req.body.user_id,
    published: req.body.published,
  });

  //save evaluation in the database
  Evaluation.create(evaluation, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while creating.',
      });
    } else {
      res.send(data);
    }
  });
};

//retrieve all evaluations from the database
exports.findAll = (req, res) => {
  Evaluation.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving.',
      });
    } else {
      res.send(data);
    }
  });
};

//find a single evaluation with an id
exports.findOne = (req, res) => {
  Evaluation.findById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        res.status(404).send({
          message: `Not found evaluation with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving evaluation with id ' + req.params.id,
        });
      }
    } else {
      res.send(data);
    }
  });
};

//find all published evaluations
exports.findAllPublished = (req, res) => {
  Evaluation.getAllPublished((error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving.',
      });
    } else {
      res.send(data);
    }
  });
};

//update an evaluation by the id in the request
exports.update = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Evaluation.updateById(
    req.params.id,
    new Evaluation(req.body),
    (error, data) => {
      if (error) {
        if (error.kind === 'not_found') {
          res.status(404).send({
            message: `Not found evaluation with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating evaluation with id ' + req.params.id,
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

//delete an evaluation with the specified id in the request
exports.delete = (req, res) => {
  Evaluation.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        res.status(404).send({
          message: `Not found evaluation with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete evaluation with id ' + req.params.id,
        });
      }
    } else {
      res.send({ message: `Evaluation was deleted successfully!` });
    }
  });
};

//delete all evaluations from the database
exports.deleteAll = (req, res) => {
  Evaluation.removeAll((error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while removing.',
      });
    } else {
      res.send({ message: `All evaluations were deleted successfully!` });
    }
  });
};
