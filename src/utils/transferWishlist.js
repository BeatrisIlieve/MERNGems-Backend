const Wishlist = require("../models/Wishlist");

exports.transferWishlist = async (userUUID, userId) => {
  const jewelryWishlistIds = await Wishlist.find({ user: userUUID })
    .select("jewelry")
    .lean();

  if (jewelryWishlistIds.length > 0) {
    const wishlistItems = jewelryWishlistIds.map(({ jewelry }) => ({
      user: userId,
      jewelry: jewelry,
      createdAt: new Date(),
    }));

    await Wishlist.create(wishlistItems);
    await Wishlist.deleteMany({ user: userUUID });
  }
};
