const mongoose = require("mongoose");

const stoneTypeSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
});

stoneTypeSchema.pre("save", async function() {
  const currentId = await setID();

  this._id = currentId;
});

const stoneType = mongoose.model("StoneType", stoneTypeSchema);

module.exports = stoneType;

const setID = async () => {
  try {
    let lastObj = await stoneType.findOne().sort({ _id: -1 });

    lastId = lastObj._id;

    nextId = lastId + 1;

    return nextId;
  } catch (err) {
    return 1;
  }
};
