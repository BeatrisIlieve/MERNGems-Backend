const Jewelry = require("../models/Jewelry");

exports.findAll = async (data) => {
  const query = [
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
      $match: {
        category: data.categoryId,
      },
    },
    {
      $lookup: {
        as: "wishlists",
        from: "wishlists",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        from: "wishlists",
        let: {
          jewelryId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$jewelry", "$$jewelryId"],
                  },
                  {
                    $eq: ["$user", data.userId],
                  },
                ],
              },
            },
          },
        ],
        as: "userWishlist",
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
        categoryId: {
          $addToSet: "$categories._id",
        },
        jewelryTitle: {
          $addToSet: "$title",
        },
        stoneTypeIds: {
          $addToSet: "$stonetypes._id",
        },
        stoneColorIds: {
          $addToSet: "$stonecolors._id",
        },
        inventories: {
          $push: "$inventories",
        },
        isLikedByUser: {
          $first: {
            $gt: [
              {
                $size: "$userWishlist",
              },
              0,
            ],
          },
        },
      },
    },
    {
      $addFields: {
        isSoldOut: {
          $reduce: {
            input: "$inventories",
            initialValue: true,
            in: {
              $and: [
                "$$value",
                {
                  $eq: [
                    {
                      $size: {
                        $filter: {
                          input: "$$this",
                          as: "inv",
                          cond: {
                            $gt: ["$$inv.quantity", 0],
                          },
                        },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
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
        categoryId: 1,
        jewelryTitle: 1,
        stoneTypeIds: 1,
        stoneColorIds: 1,
        isSoldOut: 1,
        isLikedByUser: 1,
      },
    },
    {
      $sort: {
        isSoldOut: 1,
        _id: 1,
      },
    },
  ];

  const countQuery = [
    { $match: { category: data.categoryId } },
    { $count: "totalCount" },
  ];

  const result = await Jewelry.aggregate([
    {
      $facet: {
        data: query,
        count: countQuery,
      },
    },
  ]);

  return {
    data: result[0].data,
    totalCount: result[0].count[0] ? result[0].count[0].totalCount : 0,
  };
};

exports.findOne = async (data) => {
  const result = await Jewelry.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $lookup: {
        from: "inventories",
        localField: "_id",
        foreignField: "jewelry",
        as: "inventories",
      },
    },
    {
      $lookup: {
        from: "sizes",
        localField: "inventories.size",
        foreignField: "_id",
        as: "sizes",
      },
    },
    {
      $lookup: {
        from: "wishlists",
        localField: "_id",
        foreignField: "jewelry",
        as: "wishlists",
      },
    },
    {
      $lookup: {
        from: "wishlists",
        let: { jewelryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$jewelry", "$$jewelryId"] },
                  { $eq: ["$user", data.userId] },
                ],
              },
            },
          },
        ],
        as: "userWishlist",
      },
    },
    {
      $addFields: {
        isLikedByUser: { $gt: [{ $size: "$userWishlist" }, 0] },
      },
    },
    {
      $addFields: {
        price: { $arrayElemAt: ["$inventories.price", 0] },
      },
    },
    {
      $addFields: {
        sizes: {
          $map: {
            input: "$sizes",
            as: "size",
            in: {
              _id: "$$size._id",
              measurement: "$$size.measurement",
              title: "$$size.title",
              available: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$inventories",
                        as: "inventory",
                        cond: {
                          $and: [
                            { $eq: ["$$inventory.size", "$$size._id"] },
                            { $gt: ["$$inventory.quantity", 0] },
                          ],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        sizes: {
          $sortArray: { input: "$sizes", sortBy: { _id: 1 } },
        },
      },
    },
    {
      $addFields: {
        isSoldOut: {
          $reduce: {
            input: "$inventories",
            initialValue: true,
            in: {
              $and: ["$$value", { $eq: ["$$this.quantity", 0] }],
            },
          },
        },
      },
    },
    {
      $project: {
        title: 1,
        price: 1,
        firstImageUrl: 1,
        secondImageUrl: 1,
        description: 1,
        sizes: 1,
        category: 1,
        isLikedByUser: 1,
        isSoldOut: 1,
      },
    },
    {
      $match: { _id: data.jewelryId },
    },
  ]);
  return result;
};
