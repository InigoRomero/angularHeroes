const db = require("../models");
const Heroe = db.heroes;
const Villain = db.villain;
const Op = db.Sequelize.Op;

// Create and Save a new heroe
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.weapon || !req.body.city|| !req.body.description) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a heroe
    const heroe = {
      name: req.body.name,
      weapon: req.body.weapon,
      city: req.body.city,
      description: req.body.description
    };
  
    // Save heroe in the database
    Heroe.create(heroe)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Heroe."
        });
      });
  };
  
  // Retrieve all heroes from the database.
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Heroe.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving heroes."
        });
      });
  };
  
  // Find a single heroe with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Heroe.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving heroe with id=" + id
        });
      });
  };
  
  // Update a heroe by the id in the request
  exports.update = (req, res) => {
    const id = req.body.idHeroe;
    Heroe.update(req.body, {
      where: { idHeroe: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "heroe was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update heroe with id=${id}. Maybe heroe was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating heroe with id=" + id
        });
      });
  };
  
  // Delete a heroe with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
    Heroe.destroy({
      where: { idHeroe: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "heroe was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete heroe with id=${id}. Maybe heroe was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete heroe with id=" + id
        });
      });
  };
  
  // Delete all heroes from the database.
  exports.deleteAll = (req, res) => {
    Heroe.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} heroes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all heroes."
        });
      });
  };
  
  // find all published heroe
  exports.findAllArchEnemies  = (req, res) => {
    Heroe.findAll({
    include: [{
        model: Villain
    }] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving heroes."
        });
      });
  };