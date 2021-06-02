const express = require("express");

const app = express();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});