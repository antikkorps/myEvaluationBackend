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
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description
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
    Role.findById(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Not found role with id ${req.params.id}.`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: `Error retrieving role with id ${req.params.id}.`,
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
  
    Role.updateById(req.params.id, new Role(req.body))
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Not found role with id ${req.params.id}.`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: `Error updating role with id ${req.params.id}.`,
        });
      });
};


//delete a client with the specified id in the request
exports.delete = (req, res) => {
    Role.remove(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Not found role with id ${req.params.id}.`,
          });
        } else {
          res.send({ message: 'Role was deleted successfully!' });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: `Could not delete role with id ${req.params.id}.`,
        });
      });
};


//delete all clients from the database
exports.deleteAll = (req, res) => {
    Role.removeAll()
      .then((data) => {
        res.send({
          message: `${data.affectedRows} roles were deleted successfully!`,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || 'Some error occurred while removing all roles.',
        });
      });
};