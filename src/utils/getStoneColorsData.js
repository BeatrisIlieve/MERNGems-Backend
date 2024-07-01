const JewelryStones = require("../models/JewelryStones");

exports.getStoneColorsData = async (jewelryIds) => {
  let jewelryMatchCondition = jewelryIds.reduce((acc, curr) => {
    let jewelryId = curr;
    acc.push({ jewelry: jewelryId });
    return acc;
  }, []);

  let stoneColorsData = await JewelryStones.aggregate([
    {
      $lookup: {
        as: "jewelries",
        from: "jewelries",
        foreignField: "_id",
        localField: "jewelry",
      },
    },
    {
      $match: {
        $or: jewelryMatchCondition,
      },
    },
    {
      $group: {
        _id: "$stoneColor",
        jewelries: {
          $addToSet: "$jewelry",
        },
      },
    },
    {
      $lookup: {
        as: "stonecolors",
        from: "stonecolors",
        foreignField: "_id",
        localField: "_id",
      },
    },
    {
      $project: {
        stoneColorId: "$_id",
        entityTitle: "stoneColor",
        title: { $first: "$stonecolors.title" },
        count: {
          $size: "$jewelries",
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return stoneColorsData;
};
