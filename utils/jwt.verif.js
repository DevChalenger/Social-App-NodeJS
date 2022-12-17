const jwt = require("jsonwebtoken");

const verification = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, process.env.Secure_Token);
  const userId = verify.userId;

  return userId;
};

module.exports = verification;
