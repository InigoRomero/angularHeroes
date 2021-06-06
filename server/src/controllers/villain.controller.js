const db = require("../models");
const Heroe = db.heroes;
const Villain = db.villain;
const Op = db.Sequelize.Op;

// Create and Save a new villain
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.weapon || !req.body.description || !req.body.heroIdHeroe) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a villain
    const villain = {
      name: req.body.name,
      weapon: req.body.weapon,
      description: req.body.description,
      heroIdHeroe: req.body.heroIdHeroe
    };
  
    // Save villain in the database
    Villain.create(villain)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Villain."
        });
      });
  };
  
  // Retrieve all villains from the database.
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Villain.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving villains."
        });
      });
  };
  
  // Find a single villain with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Villain.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving villain with id=" + id
        });
      });
  };
  
  // Update a villain by the id in the request
  exports.update = (req, res) => {
    const id = req.body.idvillain;
    Villain.update(req.body, {
      where: { idvillain: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "villain was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update villain with id=${id}. Maybe villain was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating villain with id=" + id
        });
      });
  };
  
  // Delete a villain with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
    Villain.destroy({
      where: { idvillain: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "villain was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete villain with id=${id}. Maybe villain was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete villain with id=" + id
        });
      });
  };
  
  // Delete all villains from the database.
  exports.deleteAll = (req, res) => {
    Villain.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} villains were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all villains."
        });
      });
  };
  
  // find all published villain
  exports.findAllArchEnemies  = (req, res) => {
    Villain.findAll({
    include: [{
        model: Villain
    }] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving villains."
        });
      });
  };