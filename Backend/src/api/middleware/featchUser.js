const JWT = require("jsonwebtoken");

const featchUser = (req, res, next) => {
  const token = req.header("auth_token");
  const key = process.env.JWT_KEY;

  if (!token) {
    res.status(401).json({
      message: "Please authenticate using a valid token.",
    });
  } else {
    try {
      const data = JWT.verify(token, key);
      req.user = data.user;
      next();
    } catch (err) {
      res
        .status(200)
        .json({ message: "Please authenticate using a valid token." });
    }
  }
};

module.exports = featchUser;
