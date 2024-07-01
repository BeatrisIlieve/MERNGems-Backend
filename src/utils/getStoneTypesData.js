const JewelryStones = require("../models/JewelryStones");

exports.getStoneTypesData = async (jewelryIds) => {
  let jewelryMatchCondition = jewelryIds.reduce((acc, curr) => {
    let jewelryId = curr;
    acc.push({ jewelry: jewelryId });
    return acc;
  }, []);

  let stoneTypesData = await JewelryStones.aggregate([
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
        _id: "$stoneType",
        jewelries: {
          $addToSet: "$jewelry",
        },
      },
    },
    {
      $lookup: {
        as: "stonetypes",
        from: "stonetypes",
        foreignField: "_id",
        localField: "_id",
      },
    },
    {
      $project: {
        entityTitle: "stoneType",
        stoneTypeId: "$_id",
        title: { $first: "$stonetypes.title" },
        count: {
          $size: "$jewelries",
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return stoneTypesData;
};
