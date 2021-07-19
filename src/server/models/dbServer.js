const dbModel = require("./db");

const getAllList = function (f1) {
  dbModel.find({}, (err, items) => {
    if (!err) {
      return f1({ success: items }, null);
    } else {
      return f1(null, { status: 500, msg: err });
    }
  });
};
const addItem = async function (item, f1) {
  if (!item.todoContent) {
    return f1(null, { error: { status: 400, msg: "Invalid payload" } });
  }
  const result = await dbModel.find({ id: item.id }, (err, items) => {
    if (err) {
      return f1(null, { status: 500, msg: err });
    }
  });
  if (result.length !== 0) {
    return f1(null, { status: 400, msg: "Duplicate Entry" });
  }
  const itemSave = new dbModel({
    id: item.id,
    todoContent: item.todoContent,
    complete: false,
  });
  itemSave.save(function (error) {
    if (error) {
      return f1(null, { status: 500, msg: err });
    }
    return f1({ success: true }, null);
  });
};
const updateItem = function (item, f1) {
  dbModel.updateOne({ id: item.id }, { complete: item.complete }, (err) => {
    if (!err) {
      return f1({ success: true }, null);
    } else {
      return f1(null, { status: 500, msg: err });
    }
  });
};
const deleteItem = function (id, f1) {
  dbModel.deleteOne({ id: id }, (err) => {
    if (!err) {
      return f1({ success: true });
    }
    return f1({ error: { status: 500, msg: err } });
  });
};
module.exports = {
  addItem,
  getAllList,
  updateItem,
  deleteItem,
};
