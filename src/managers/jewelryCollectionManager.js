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
        jewelryCollection: data.jewelryCollectionId,
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
        let: { jewelryId: "$_id" },
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
        stoneTypeIds: {
          $addToSet: "$stonetypes._id",
        },
        stoneColorIds: {
          $addToSet: "$stonecolors._id",
        },
        jewelryTitle: {
          $addToSet: "$title",
        },
        inventories: {
          $push: "$inventories",
        },
        isLikedByUser: {
          $first: {
            $gt: [{ $size: "$userWishlist" }, 0],
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
        stoneTypeIds: 1,
        stoneColorIds: 1,
        jewelryTitle: 1,
        isSoldOut: 1,
        isLikedByUser: 1,
      },
    },
    { $sort: { isSoldOut: 1, _id: 1 } },
  ];

  const countQuery = [
    { $match: { jewelryCollection: data.jewelryCollectionId } },
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
