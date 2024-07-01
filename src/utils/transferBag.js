const Bag = require("../models/Bag");

exports.transferBag = async (userUUID, userId) => {
  const jewelryBagIds = await Bag.find({ user: userUUID })
    .select("jewelry size quantity")
    .lean();

  if (jewelryBagIds.length > 0) {
    const bagItems = jewelryBagIds.map(({ jewelry, size, quantity }) => ({
      user: userId,
      jewelry: jewelry,
      size,
      quantity,
      createdAt: new Date(),
    }));

    await Bag.create(bagItems);
    await Bag.deleteMany({ user: userUUID });
  }
};
