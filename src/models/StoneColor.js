const mongoose = require("mongoose");

const stoneColorSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
});

stoneColorSchema.pre("save", async function() {
  const currentId = await setID();

  this._id = currentId;
});

const stoneColor = mongoose.model("StoneColor", stoneColorSchema);

module.exports = stoneColor;

const setID = async () => {
  try {
    let lastObj = await stoneColor.findOne().sort({ _id: -1 });

    lastId = lastObj._id;

    nextId = lastId + 1;

    return nextId;
  } catch (err) {
    return 1;
  }
};

