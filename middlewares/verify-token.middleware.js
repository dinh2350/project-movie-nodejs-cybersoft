const jwt = require("jsonwebtoken");
const { RESPONSE_CODE } = require("../constants");
const { getTimeStampSecond } = require("../ultils/date");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("movie_token");
    const secretKey = "nodejs-17";
    const decode = jwt.verify(token, secretKey);
    if (decode.exp < getTimeStampSecond()) {
      return res.status(RESPONSE_CODE.FORBIDDEN).send("token is expried");
    }

    const { id, email, role } = decode;

    req.user = { id, email, role };

    next();
  } catch (error) {
    res.status(RESPONSE_CODE.BAD_REQUEST).send("invalid token");
  }
};

const authorize =
  (...arrRole) =>
  (req, res, next) => {
    const { user } = req;
    const { id, email, role } = user;

    const index = arrRole.findIndex((_role) => _role === role);

    if (index === -1)
      return res.status(RESPONSE_CODE.FORBIDDEN).send("FORBIDDEN");
    next();
  };

module.exports = {
  authenticate,
  authorize,
};
