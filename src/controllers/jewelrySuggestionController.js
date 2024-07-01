const router = require("express").Router();
const jewelrySuggestionManager = require("../managers/jewelrySuggestionManager");

router.get("/:jewelryId", async (req, res) => {
  const jewelryId = req.params.jewelryId;

  try {
    const result = await jewelrySuggestionManager.findAll(jewelryId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
