const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.Secure_Token, (error, user) => {
      if (error) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.send(401).json("You are not authenticated");
  }
};

const verifyAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized");
    }
  });
};

module.exports = {
  verifyToken,
  verifyAuth,
  verifyAdmin,
};
