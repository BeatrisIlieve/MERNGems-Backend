const STREET_LENGTH = {
  MIN: 8,
  MAX: 255,
};

module.exports.STREET_PATTERN = new RegExp(
  `^[a-zA-Z0-9 ]{${STREET_LENGTH.MIN},${STREET_LENGTH.MAX}}$`
);
module.exports.STREET_ERROR_MESSAGE = `This field requires ${STREET_LENGTH.MIN}-${STREET_LENGTH.MAX} characters`;
