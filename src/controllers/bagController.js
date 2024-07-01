const router = require("express").Router();
const bagManager = require("../managers/bagManager");
const {
  DEFAULT_ADD_QUANTITY,
  DEFAULT_MIN_QUANTITY,
  NOT_SELECTED_SIZE_ERROR_MESSAGE,
  SOLD_OUT_JEWELRY_ERROR_MESSAGE,
} = require("../constants/bag");
const Bag = require("../models/Bag");
const Inventory = require("../models/Inventory");

router.get("/find-all/:userId", async (req, res) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  try {
    const jewelries = await bagManager.findAll(userId);

    res.status(200).json({ jewelries, DEFAULT_MIN_QUANTITY });
  } catch (err) {
    console.log(err.message);

    res.status(401).json({
      message: err.message,
    });
  }
});

router.get("/find-count", async (req, res) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  try {
    const result = await bagManager.findCount(userId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.post("/create/:jewelryId", async (req, res) => {
  const { size } = req.body;

  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const jewelryId = Number(req.params.jewelryId);

  try {
    let bagItem;
    let sizeId;

    const isAvailable = await Inventory.findOne({
      jewelry: jewelryId,
      size: Number(size),
      quantity: { $gt: 0 },
    });

    if (!size) {
      throw new Error(NOT_SELECTED_SIZE_ERROR_MESSAGE);
    } else if (!isAvailable) {
      throw new Error(SOLD_OUT_JEWELRY_ERROR_MESSAGE);
    } else {
      sizeId = Number(size);

      bagItem = await bagManager.getOne({
        userId,
        jewelryId,
        sizeId,
      });
    }

    if (!bagItem) {
      await bagManager.create({
        userId,
        jewelryId,
        sizeId,
        quantity: DEFAULT_ADD_QUANTITY,
      });
    } else {
      newQuantity = Number(bagItem.quantity) + DEFAULT_ADD_QUANTITY;
      await Bag.findOneAndUpdate(
        {
          user: userId,
          jewelry: jewelryId,
          size: sizeId,
        },
        { quantity: newQuantity }
      );

      await Inventory.findOneAndUpdate(
        { jewelry: jewelryId, size: sizeId },
        { $inc: { quantity: -1 } },
        { new: true }
      );
    }

    const result = await Bag.find({
      user: userId,
    });

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);

    res.status(401).json({
      message: err.message,
    });
  }
});

router.put("/decrease/:bagId", async (req, res) => {
  const bagId = req.params.bagId;

  try {
    const result = await bagManager.decrease(bagId);

    res.status(200).json({ result });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

router.put("/increase/:bagId", async (req, res) => {
  const bagId = req.params.bagId;

  try {
    const result = await bagManager.increase(bagId);

    res.status(200).json({ result });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

router.put("/update/:bagId", async (req, res) => {
  const bagId = req.params.bagId;

  const { quantity } = req.body;

  try {
    const result = await bagManager.update(bagId, quantity);

    res.status(200).json({ result });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

router.delete("/delete/:bagId", async (req, res) => {
  const bagId = req.params.bagId;

  try {
    const result = await bagManager.delete(bagId);

    res.status(200).json({ result });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
