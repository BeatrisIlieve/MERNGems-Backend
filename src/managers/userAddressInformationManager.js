const UserAddressInformation = require("../models/UserAddressInformation");

exports.create = async (data) => {
  await UserAddressInformation.create(data);
};

exports.find = async (userId) => {
  const result = await UserAddressInformation.findById(userId);

  return result;
};

exports.update = async (userId, data) => {
  const result = await UserAddressInformation.findByIdAndUpdate(userId, data, {
    runValidators: true,
    new: true,
  });

  return result;
};

exports.delete = async (userId) => {
  const result = await UserAddressInformation.findByIdAndDelete(userId);

  return result;
};
