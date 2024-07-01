const router = require("express").Router();
const Order = require("../models/Order");

router.get("/display/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    orderItems = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(orderItems);
  } catch (err) {
    console.log(err);

    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
