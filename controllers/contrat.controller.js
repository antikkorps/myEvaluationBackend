const Contrat = require('../models/contrat.model.js');

//create and save a new contrat
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  //create a contrat
  const contrat = new Contrat({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    published: req.body.published,
    begin_date: req.body.begin_date,
    end_date: req.body.end_date,
  });

  //Save contrat in the database
  Contrat.create(contrat, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while creating.',
      });
    } else {
      res.send(data);
    }
  });
};

//retrieve all contrats from the database
exports.findAll = (req, res) => {
  Contrat.getAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while retrieving.',
      });
    });
};

//find a single contrat with an id
exports.findOne = (req, res) => {
  Contrat.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Not found contrat with id ${req.params.id}.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error retrieving contrat with id ${req.params.id}.`,
      });
    });
};

//update a contrat by the id in the request
exports.update = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Contrat.updateById(req.params.id, new Contrat(req.body))
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Not found contrat with id ${req.params.id}.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error updating contrat with id ${req.params.id}.`,
      });
    });
};

//delete a contrat with the specified id in the request
exports.delete = (req, res) => {
  Contrat.remove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Not found contrat with id ${req.params.id}.`,
        });
      } else {
        res.send({ message: 'Contrat was deleted successfully!' });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Could not delete contrat with id ${req.params.id}.`,
      });
    });
};

//delete all contrats from the database
exports.deleteAll = (req, res) => {
  Contrat.removeAll()
    .then((data) => {
      res.send({
        message: `${data.affectedRows} contrats were deleted successfully!`,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while removing all contrats.',
      });
    });
};
