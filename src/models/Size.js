const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0,
  },
  measurement: {
    type: String,
    required: true,
  },
});

sizeSchema.pre("save", async function () {
  const currentId = await setID();

  this._id = currentId;
});

const size = mongoose.model("Size", sizeSchema);

module.exports = size;

const setID = async () => {
  try {
    let lastObj = await size.findOne().sort({ _id: -1 });

    lastId = lastObj._id;

    nextId = lastId + 1;

    return nextId;
  } catch (err) {
    return 1;
  }
};
