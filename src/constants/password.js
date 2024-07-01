module.exports.DEFAULT_SALT = 10;

const PASSWORD_LENGTH = {
  MIN: 8,
  MAX: 255,
};

module.exports.PASSWORD_PATTERN = new RegExp(
  `^(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[0-9]{1})[A-Za-z0-9]{${PASSWORD_LENGTH.MIN},${PASSWORD_LENGTH.MAX}}$`
);

module.exports.PASSWORD_ERROR_MESSAGE = `Password must be ${PASSWORD_LENGTH.MIN}-${PASSWORD_LENGTH.MAX} characters and include at least one lowercase letter, one uppercase letter, and one digit.`;

module.exports.INVALID_PASSWORD_ERROR_MESSAGE =
  "Ensure you enter a valid password";
