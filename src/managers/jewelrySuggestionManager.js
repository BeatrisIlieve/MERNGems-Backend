const Jewelry = require("../models/Jewelry");
const { getCategoryIds } = require("../utils/getCategoryIds");
const { extractStoneColors } = require("../utils/extractStoneColors");

exports.findAll = async (jewelryId) => {
  const jewelry = await Jewelry.findById(jewelryId);

  const categoryId = jewelry.category;

  const collectionId = jewelry.jewelryCollection;

  const categoryIds = await getCategoryIds(categoryId);

  const colors = await Jewelry.aggregate([
    {
      $match: {
        _id: Number(jewelryId),
      },
    },
    {
      $lookup: {
        as: "jewelrystones",
        from: "jewelrystones",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        as: "stonecolors",
        from: "stonecolors",
        foreignField: "_id",
        localField: "jewelrystones.stoneColor",
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        "jewelrystones.stoneColor": 1,
      },
    },
  ]);

  const colorIds = extractStoneColors(colors);

  const result = await Jewelry.aggregate([
    {
      $lookup: {
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "category",
      },
    },
    {
      $match: {
        category: { $in: categoryIds },
      },
    },
    {
      $lookup: {
        as: "jewelrycollections",
        from: "jewelrycollections",
        foreignField: "_id",
        localField: "jewelryCollection",
      },
    },
    {
      $match: {
        jewelryCollection: collectionId,
      },
    },
    {
      $lookup: {
        as: "jewelrystones",
        from: "jewelrystones",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        as: "stonecolors",
        from: "stonecolors",
        foreignField: "_id",
        localField: "jewelrystones.stoneColor",
      },
    },
    {
      $match: {
        $or: [{ "jewelrystones.stoneColor": { $in: colorIds } }],
      },
    },
    {
      $lookup: {
        as: "inventories",
        from: "inventories",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $match: {
        "inventories.quantity": {
          $gt: 0,
        },
      },
    },
    {
      $sort: {
        "categories._id": 1,
      },
    },
    {
      $group: {
        _id: "$category",
        firstJewelry: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$firstJewelry" },
    },
    {
      $project: {
        "categories.title": 1,
        title: 1,
        firstImageUrl: 1,
        _id: 1,
      },
    },
  ]);

  return result;
};
