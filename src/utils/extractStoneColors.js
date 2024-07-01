exports.extractStoneColors = (colors) => {
  return colors.flatMap((item) => {
    const stoneColors = item["jewelrystones"].map((stone) => stone.stoneColor);

    if (stoneColors.length > 1) {
      return stoneColors.filter((color) => color !== 6);
    }

    return stoneColors;
  });
};
