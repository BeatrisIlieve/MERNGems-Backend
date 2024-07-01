const PHONE_LENGTH = {
  MIN: 7,
  MAX: 15,
};

module.exports.PHONE_PATTERN = new RegExp(`^[0-9]{${PHONE_LENGTH.MIN},${PHONE_LENGTH.MAX}}$`);
module.exports.PHONE_ERROR_MESSAGE = `This field requires ${PHONE_LENGTH.MIN}-${PHONE_LENGTH.MAX} digits`;
