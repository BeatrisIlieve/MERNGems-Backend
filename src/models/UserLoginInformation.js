const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  DEFAULT_SALT,
  PASSWORD_PATTERN,
  PASSWORD_ERROR_MESSAGE,
} = require("../constants/password");

const { EMAIL_PATTERN, EMAIL_ERROR_MESSAGE } = require("../constants/email");

const userLoginInformationSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  email: {
    type: String,
    required: [true, EMAIL_ERROR_MESSAGE],
    match: [EMAIL_PATTERN, EMAIL_ERROR_MESSAGE],
    unique: true,
  },
  password: {
    type: String,
    required: [true, PASSWORD_ERROR_MESSAGE],
    validate: {
      validator: function (value) {
        return PASSWORD_PATTERN.test(value);
      },
      message: PASSWORD_ERROR_MESSAGE,
    },
  },
});

userLoginInformationSchema.pre("save", async function () {
  this._id = this._id;
});

userLoginInformationSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, DEFAULT_SALT);

  this.password = hash;
});

const UserLoginInformation = mongoose.model(
  "UserLoginInformation",
  userLoginInformationSchema
);

module.exports = UserLoginInformation;
