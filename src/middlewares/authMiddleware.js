const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const token = req.header("X-Authorization");

  if (token) {
    try {
      const decodedToken = jwt.verify(token, "4bbac8ce0aca40d84618677c0fcae39ddc9880ba2272a7995783bce1287cf678");

      req.user = decodedToken;

      next();
    } catch (err) {
      res.status(401).json({
        message: "You are not authorized!",
      });
    }
  } else {
    next();
  }
};
