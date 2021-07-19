const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dbServer = require("./models/dbServer");

mongoose.connect("mongodb://localhost/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router
  .get("/", (req, res) => {
    dbServer.getAllList((resp, err) => {
      if (err) {
        return res.status(err.status).send(err.msg);
      }
      return res.status(200).json(resp.success);
    });
  })
  .post("/", function (req, res) {
    dbServer.addItem(req.body, (resp, err) => {
      if (err) {
        return res.status(err.status).send(err.msg);
      }
      return res.status(201).send();
    });
  })
  .put("/", (req, res) => {
    dbServer.updateItem(req.body, (resp, err) => {
      if (err) {
        return res.status(err.status).send(err.msg);
      }
      return res.status(201).send();
    });
  })
  .delete("/:id", (req, res) => {
    const resp = dbServer.deleteItem(req.params.id, (resp, err) => {
      if (err) {
        return res.status(err.status).send(err.msg);
      }
      return res.status(200).send();
    });
  });
module.exports = router;
