module.exports = app => {
    const villains = require("../controllers/villain.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", villains.create);
  
    // Retrieve all villains
    router.get("/", villains.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", villains.findOne);
  
    // Update a Tutorial with id
    router.put("/", villains.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", villains.delete);
  
    // Delete all villains
    router.delete("/", villains.deleteAll);
  
    app.use('/api/villains', router);
  };