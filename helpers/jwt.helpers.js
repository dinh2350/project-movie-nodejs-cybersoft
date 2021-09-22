const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const secretKey = "nodejs-17";

  const token = jwt.sign(payload, secretKey, {
    expiresIn: "24h", // 1 ngay co 86400s
  });

  return token;
};

module.exports = {
  generateToken,
};
