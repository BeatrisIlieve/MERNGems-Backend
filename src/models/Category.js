const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
});

categorySchema.pre("save", async function () {
  const currentId = await setID();

  this._id = currentId;
});

const category = mongoose.model("Category", categorySchema);

module.exports = category;

const setID = async () => {
  try {
    let lastObj = await category.findOne().sort({ _id: -1 });

    lastId = lastObj._id;

    nextId = lastId + 1;

    return nextId;
  } catch (err) {
    return 1;
  }
};
