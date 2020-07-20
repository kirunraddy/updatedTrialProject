var contact = require("../schema/contactschema.js");
var express = require("express");
var contRouter = express.Router();
var body = require("body-parser");
contRouter.use(body.json());

var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/helloworld";

contRouter.get("/get", function (req, res) {
  contact.find({}, function (err, succ) {
    if (err) {
      console.log(err);
    } else {
      console.log(succ);
      res.send(succ);
    }
  });
});

contRouter.post("/contsave", function (req, res) {
  console.log(req.body);
  var cnt = contact(req.body);
  cnt.save(function (err, succ) {
    if (err) {
      console.log(err);
    } else {
      console.log(succ);
      res.json(succ);
    }
  });
});

contRouter.put("/contup/:id", function (req, res) {
  contact.update({ _id: req.params.id }, { $set: req.body }, function (
    err,
    succ
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log(succ);
      res.send(succ);
    }
  });
});

contRouter.delete("/del/:_id", function (req, res) {
  contact.remove({ _id: req.params._id }, function (err, succ) {
    if (err) console.log(err);
    else console.log(succ);

    res.send(succ);
  });
});

contRouter.delete("/delAll", function (req, res) {
  mongoClient.connect(url, function (err, database) {
    if (err) {
      console.log("Sorry unable to connect to MongoDB Error:", err);
    } else {
      var db = database.db("helloworld");
      var collection = db.collection("contacts");

      collection.deleteMany({}, function (err, succ) {
        console.log(succ);
      });
      database.close();
    }
  });
});

module.exports = contRouter;
