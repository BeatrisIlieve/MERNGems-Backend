const router = require("express").Router();
const orderConfirmationManager = require("../managers/orderConfirmationManager");
const Bag = require("../models/Bag");
const { sendOrderConfirmationEmail } = require("../../mailer");
const UserLoginInformation = require("../models/UserLoginInformation");
const UserPersonalInformation = require("../models/UserPersonalInformation");

router.get("/display/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const order = await orderConfirmationManager.getOne(userId);

    await Bag.deleteMany({ user: userId });

    const userLoginInformation = await UserLoginInformation.findById(userId);

    const email = userLoginInformation.email;

    const userPersonalInformation = await UserPersonalInformation.findById(
      userId
    );

    const firstName = userPersonalInformation.firstName;

    sendOrderConfirmationEmail(email, firstName);

    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
