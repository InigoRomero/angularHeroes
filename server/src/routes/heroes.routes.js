module.exports = app => {
    const heroes = require("../controllers/heroes.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", heroes.create);
  
    // Retrieve all heroes
    router.get("/", heroes.findAll);
  
    // Retrieve all published heroes
    router.get("/archenemies", heroes.findAllArchEnemies);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", heroes.findOne);
  
    // Update a Tutorial with id
    router.put("/", heroes.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", heroes.delete);
  
    // Delete all heroes
    router.delete("/", heroes.deleteAll);
  
    app.use('/api/heroes', router);
  };