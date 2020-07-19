var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var schema = mongoose.Schema;
var contactschema = new schema({
  sn: Number,
  name: String,
  email: String,
  number: Number,
});
var contact = mongoose.model("contact", contactschema);
module.exports = contact;
