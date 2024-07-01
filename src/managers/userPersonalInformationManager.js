const UserPersonalInformation = require("../models/UserPersonalInformation");

exports.create = async (data) => {
  await UserPersonalInformation.create(data);
};

exports.find = async (userId) => {
  const result = await UserPersonalInformation.findById(userId);

  return result;
};

exports.update = async (userId, data) => {
  const result = await UserPersonalInformation.findByIdAndUpdate(userId, data, {
    runValidators: true,
    new: true,
  });

  return result;
};

exports.delete = async (userId) => {
  const result = await UserPersonalInformation.findByIdAndDelete(userId);

  return result;
};
