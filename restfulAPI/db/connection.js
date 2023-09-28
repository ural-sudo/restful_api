const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/restful_api")
  .then((result) => {
    console.log("Connectin success");
  })
  .catch((err) => {
    console.log("Connection failed");
  });