const router = require("express").Router();
const jewelryCollectionManager = require("../managers/jewelryCollectionManager");
const { getStoneTypesData } = require("../utils/getStoneTypesData");
const { getStoneColorsData } = require("../utils/getStoneColorsData");

router.get("/:jewelryCollectionId", async (req, res) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
    console.log(req.user);
  } else {
    userId = req.headers["user-uuid"];
  }

  const jewelryCollectionId = Number(req.params.jewelryCollectionId);

  const data = { userId, jewelryCollectionId };

  try {
    let result = await jewelryCollectionManager.findAll(data);

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

module.exports = router;
