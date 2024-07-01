const router = require("express").Router();
const { getStoneTypesData } = require("../utils/getStoneTypesData");
const { getStoneColorsData } = require("../utils/getStoneColorsData");

router.get("/by-stone-types", async (req, res) => {

  const serializedObject =
    req.query.data !== "undefined" ? req.query.data : "undefined";
  const jewelryDictionary =
    req.query.data !== "undefined"
      ? JSON.parse(decodeURIComponent(serializedObject))
      : null;

  const jewelryIds = jewelryDictionary["JewelryIds"];

  data = { jewelryIds };

  try {
    const stoneTypesData = await getStoneTypesData(jewelryIds);

    result = { stoneTypesData };

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.get("/by-stone-colors", async (req, res) => {
  const serializedObject =
    req.query.data !== "undefined" ? req.query.data : "undefined";
  const jewelryDictionary =
    req.query.data !== "undefined"
      ? JSON.parse(decodeURIComponent(serializedObject))
      : null;

  const jewelryIds = jewelryDictionary["JewelryIds"];

  data = { jewelryIds };

  try {
    const stoneColorsData = await getStoneColorsData(jewelryIds);

    result = { stoneColorsData };

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
