const Role = require('../models/role.model.js');

//create and save a new role
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }
  
    //create a role
    const role = new Role({
      id: req.body.id,
      libelle: req.body.libelle,
      slug: req.body.slug,
    });
  
    //Save contrat in the database
    Role.create(role, (error, data) => {
      if (error) {
        res.status(500).send({
          message: error.message || 'Some error occurred while creating.',
        });
      } else {
        res.send(data);
      }
    });
};


//retrieve all clients from the database
exports.findAll = (req, res) => {
    Role.getAll()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message || 'Some error occurred while retrieving.',
        });
      });
};

//find a single client with an id
exports.findOne = (req, res) => {
    Client.findById(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Not found client with id ${req.params.id}.`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: `Error retrieving client with id ${req.params.id}.`,
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
  
    Client.updateById(req.params.id, new Client(req.body))
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Not found client with id ${req.params.id}.`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: `Error updating client with id ${req.params.id}.`,
        });
      });
};


//delete a client with the specified id in the request
exports.delete = (req, res) => {
    Client.remove(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Not found client with id ${req.params.id}.`,
          });
        } else {
          res.send({ message: 'Client was deleted successfully!' });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: `Could not delete client with id ${req.params.id}.`,
        });
      });
};


//delete all clients from the database
exports.deleteAll = (req, res) => {
    Client.removeAll()
      .then((data) => {
        res.send({
          message: `${data.affectedRows} clients were deleted successfully!`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || 'Some error occurred while removing all clients.',
        });
      });
};