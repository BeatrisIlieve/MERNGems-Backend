const mongoose = require("mongoose");

const jewelryCollectionSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
});

jewelryCollectionSchema.pre("save", async function () {
  const currentId = await setID();

  this._id = currentId;
});

const jewelryCollection = mongoose.model("JewelryCollection", jewelryCollectionSchema);

module.exports = jewelryCollection;

const setID = async () => {
  try {
    let lastObj = await jewelryCollection.findOne().sort({ _id: -1 });

    lastId = lastObj._id;

    nextId = lastId + 1;

    return nextId;
  } catch (err) {
    return 1;
  }
};
