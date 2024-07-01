const router = require("express").Router();
const userLoginInformationManager = require("../managers/userLoginInformationManager");
const userPersonalInformationManager = require("../managers/userPersonalInformationManager");
const userAddressInformationManager = require("../managers/userAddressInformationManager");
const userLoginInformation = require("../models/UserLoginInformation");
const { transferBag } = require("../utils/transferBag");
const { transferWishlist } = require("../utils/transferWishlist");
const { sendRegistrationEmail } = require("../../mailer");
const Bag = require("../models/Bag");
const Wishlist = require("../models/Wishlist");

router.post("/register", async (req, res) => {
  const userUUID = req.headers["user-uuid"];

  const { email, password, firstName, lastName } = req.body;

  try {
    const { token } = await userLoginInformationManager.register({
      _id: userUUID,
      email,
      password,
    });

    await userPersonalInformationManager.create({
      _id: userUUID,
      firstName,
      lastName,
    });

    await userAddressInformationManager.create({ _id: userUUID });

    sendRegistrationEmail(email, firstName);

    res.status(201).json({ token, userId: userUUID });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const userUUID = req.headers["user-uuid"];

  const { email, password } = { ...req.body };

  try {
    const user = await userLoginInformation.findOne({ email });

    if (user) {
      const userId = user._id;

      if (userId !== userUUID) {
        await transferWishlist(userUUID, userId);

        await transferBag(userUUID, userId);
      }
    }

    const result = await userLoginInformationManager.login({ email, password });

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await userLoginInformationManager.find(userId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.put("/update-email/:userId", async (req, res) => {
  const userId = req.params.userId;

  const data = { ...req.body };

  try {
    const result = await userLoginInformationManager.updateEmail(userId, data);

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.put("/update-password/:userId", async (req, res) => {
  const userId = req.params.userId;

  const data = { ...req.body };

  try {
    const result = await userLoginInformationManager.updatePassword(
      userId,
      data
    );

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.get("/logout", (req, res) => {
  res.end();
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await userLoginInformationManager.delete(userId);

    await userPersonalInformationManager.delete(userId);

    await userAddressInformationManager.delete(userId);

    await Bag.deleteMany({ user: userId });
    await Wishlist.deleteMany({ user: userId });

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
