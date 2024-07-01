const Order = require("../models/Order");
const bagManager = require("../managers/bagManager");

exports.create = async (userId) => {
  const orderData = await bagManager.findAll(userId);

  const order = await Order.create({
    user: userId,
    status: "Pending",
  });

  order.jewelries = orderData[0].documents;

  order.subTotal = orderData[0].totalTotalPrice;

  await order.save();

  return order;
};

exports.getOne = async (userId) => {
  const order = await Order.findOne({ user: userId }).sort({ createdAt: -1 });
  return order;
};
