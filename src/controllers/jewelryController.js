const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");
const { getStoneTypesData } = require("../utils/getStoneTypesData");
const { getStoneColorsData } = require("../utils/getStoneColorsData");

router.get("/by-category/:categoryId", async (req, res) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const categoryId = Number(req.params.categoryId);

  data = { userId, categoryId };

  try {
    let result = await jewelryManager.findAll(data);

    const jewelries = result.data;

    const jewelryIds = jewelries.map((jewelry) => jewelry._id);

    const stoneTypesData = await getStoneTypesData(jewelryIds);

    const stoneColorsData = await getStoneColorsData(jewelryIds);

    result = { ...result, stoneTypesData, stoneColorsData };

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.get("/by-jewelry/:jewelryId", async (req, res) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const jewelryId = Number(req.params.jewelryId);

  data = { userId, jewelryId };

  try {
    const result = await jewelryManager.findOne(data);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
