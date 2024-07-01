const Wishlist = require("../models/Wishlist");
const Jewelry = require("../models/Jewelry");

const create = async (data) => {
  const result = await Wishlist.create(data);

  return result;
};

const deleteWishlist = async (data) => {
  const result = await Wishlist.findOneAndDelete(data);

  return result;
};

const findAll = async (data) => {
  const query = [
    {
      $lookup: {
        as: "wishlists",
        from: "wishlists",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $match: {
        "wishlists.user": data.userId,
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
        jewelryTitle: {
          $addToSet: "$title",
        },
        createdAt: {
          $first: {
            $arrayElemAt: ["$wishlists.createdAt", 0],
          },
        },
      },
    },
    {
      $project: {
        price: 1,
        firstImageUrl: 1,
        jewelryIds: 1,
        categoryTitle: 1,
        jewelryTitle: 1,
        createdAt: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];

  const result = await Jewelry.aggregate([
    {
      $facet: {
        data: query,
      },
    },
  ]);

  const count = await findCount(data.userId);

  return {
    data: result[0].data,
    totalCount: count,
  };
};

const findCount = async (userId) => {
  const result = await Wishlist.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
      },
    },
  ]);

  return result[0] ? result[0].count : 0;
};

module.exports = {
  create,
  delete: deleteWishlist,
  findAll,
  findCount,
};
