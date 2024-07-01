const router = require("express").Router();
const userAddressInformationManager = require("../managers/userAddressInformationManager");

router.put("/update/:userId", async (req, res) => {
  const userId = req.params.userId;

  const data = req.body;

  try {
    const address = await userAddressInformationManager.update(userId, data);

    res.status(200).json(address);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
