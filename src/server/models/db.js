const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  id: { type: Number },
  todoContent: { type: String },
  complete: { type: Boolean },
});
module.exports = mongoose.model("todo", TodoSchema);
