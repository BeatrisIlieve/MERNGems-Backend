const Jewelry = require("../models/Jewelry");

exports.findAll = async (search) => {
  const searchTerms = search
    .split(" ")
    .map((term) => term.trim())
    .filter((term) => term.length > 0);
  const regexTerms = searchTerms.map((term) => new RegExp(term, "i"));

  const searchResult = await Jewelry.aggregate([
    {
      $lookup: {
        as: "jewelrymetals",
        from: "jewelrymetals",
        foreignField: "jewelry",
        localField: "_id",
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
      $lookup: {
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "category",
      },
    },
    {
      $lookup: {
        as: "collections",
        from: "collections",
        foreignField: "_id",
        localField: "collection",
      },
    },
    {
      $lookup: {
        as: "metals",
        from: "metals",
        foreignField: "_id",
        localField: "jewelrymetals.metal",
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
      $match: {
        "inventories.quantity": {
          $gt: 0,
        },
      },
    },
    {
      $lookup: {
        as: "stonetypes",
        from: "stonetypes",
        foreignField: "_id",
        localField: "jewelrystones.stoneType",
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
        $and: [
          ...regexTerms.map((regex) => ({
            $or: [
              { title: { $regex: regex } },
              { "metals.title": { $regex: regex } },
              { "categories.title": { $regex: regex } },
              { "collections.title": { $regex: regex } },
              { "stonetypes.title": { $regex: regex } },
              { "stonecolors.title": { $regex: regex } },
            ],
          })),
        ],
      },
    },
    {
      $group: {
        _id: "$_id",
        price: {
          $first: {
            $arrayElemAt: ["$inventories.price", 0],
          },
        },
        firstImageUrl: {
          $addToSet: "$firstImageUrl",
        },
        jewelryIds: {
          $push: "$_id",
        },
        categoryTitle: {
          $addToSet: "$categories.title",
        },
        collectionTitle: {
          $addToSet: "$collections.title",
        },
        jewelryTitle: {
          $addToSet: "$title",
        },
      },
    },
    {
      $project: {
        price: 1,
        firstImageUrl: 1,
        jewelryIds: 1,
        categoryTitle: 1,
        collectionTitle: 1,
        jewelryTitle: 1,
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return searchResult;
};
