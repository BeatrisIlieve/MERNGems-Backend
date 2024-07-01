const mongoose = require("mongoose");
const { NAME_PATTERN, NAME_ERROR_MESSAGE } = require("../constants/name");
const { DATE_PATTERN, DATE_ERROR_MESSAGE } = require("../constants/date");

const userPersonalInformationSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  firstName: {
    type: String,
    match: [NAME_PATTERN, NAME_ERROR_MESSAGE],
  },
  lastName: {
    type: String,
    match: [NAME_PATTERN, NAME_ERROR_MESSAGE],
  },
  birthday: {
    type: String,
    match: [DATE_PATTERN, DATE_ERROR_MESSAGE],
  },
  specialDay: {
    type: String,
    match: [DATE_PATTERN, DATE_ERROR_MESSAGE],
  },
});

userPersonalInformationSchema.pre("save", async function () {
  this._id = this._id;
});

const UserPersonaLInformation = mongoose.model(
  "UserPersonaLInformation",
  userPersonalInformationSchema
);

module.exports = UserPersonaLInformation;
