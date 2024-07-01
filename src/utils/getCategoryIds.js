const Category = require("../models/Category");

exports.getCategoryIds = async (excludeCategoryId) => {
  try {
    const allCategories = await Category.find({}, "_id").lean();

    const categoryIds = allCategories
      .map((doc) => doc._id)
      .filter((id) => id.toString() !== excludeCategoryId.toString());

    return categoryIds;
  } catch (err) {
    console.log(err.message);
  }
};
