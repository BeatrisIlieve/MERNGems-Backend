const UserLoginInformation = require("../models/UserLoginInformation");
const { EMAIL_PATTERN, EMAIL_ERROR_MESSAGE } = require("../constants/email");
const { EMAIL_ALREADY_EXISTS_ERROR_MESSAGE } = require("../constants/email");
const { INVALID_CREDENTIALS_ERROR_MESSAGE } = require("../constants/email");
const jwt = require("../lib/jwt");
const bcrypt = require("bcrypt");
const {
  DEFAULT_SALT,
  INVALID_PASSWORD_ERROR_MESSAGE,
} = require("../constants/password");
require("dotenv").config();

exports.register = async (data) => {
  const user = await UserLoginInformation.findOne({ email: data.email });

  if (user) {
    throw new Error(EMAIL_ALREADY_EXISTS_ERROR_MESSAGE);
  }

  const createdUser = await UserLoginInformation.create(data);

  const token = await generateToken(createdUser);

  return { token };
};

exports.login = async (data) => {
  const user = await UserLoginInformation.findOne({ email: data.email });

  if (!user) {
    throw new Error(INVALID_CREDENTIALS_ERROR_MESSAGE);
  }

  const isValid = await bcrypt.compare(data.password, user.password);

  if (!isValid) {
    throw new Error(INVALID_CREDENTIALS_ERROR_MESSAGE);
  }

  const token = await generateToken(user);

  return { token, user };
};

exports.find = async (userId) => {
  const result = await UserLoginInformation.findById(userId);

  return result;
};

exports.updateEmail = async (userId, data) => {
  let user = await UserLoginInformation.findById(userId);

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  const isEmailValid = EMAIL_PATTERN.test(data.email);

  if (!isPasswordValid) {
    throw new Error(INVALID_PASSWORD_ERROR_MESSAGE);
  } else if (!isEmailValid) {
    throw new Error(EMAIL_ERROR_MESSAGE);
  } else {
    await UserLoginInformation.findByIdAndUpdate(userId, { email: data.email });

    return user;
  }
};

exports.updatePassword = async (userId, data) => {
  let user = await UserLoginInformation.findById(userId);

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error(INVALID_PASSWORD_ERROR_MESSAGE);
  } else {
    const hash = await bcrypt.hash(data.newPassword, DEFAULT_SALT);
    const user = await UserLoginInformation.findByIdAndUpdate(userId, {
      password: hash,
    });
    return user;
  }
};

exports.delete = async (userId) => {
  const result = await UserLoginInformation.findByIdAndDelete(userId);

  return result;
};

async function generateToken(user) {
  const payload = {
    _id: user._id,
  };

  const token = await jwt.sign(payload, "4bbac8ce0aca40d84618677c0fcae39ddc9880ba2272a7995783bce1287cf678");

  const result = {
    _id: user._id,
    accessToken: token,
  };

  return result;
}
