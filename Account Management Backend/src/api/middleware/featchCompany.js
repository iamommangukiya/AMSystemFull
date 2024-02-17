const JWT = require("jsonwebtoken");
const feactCompany = (req, res, next) => {
  const token = req.header("com_token");
  const key = process.env.JWT_KEY;
  try {
    if (!token) {
      res
        .status(200)
        .json({ flag: false, message: "plese verify using valid token" });
    } else {
      var data = JWT.verify(token, key);

      req.cmp = data.id;
      next();
    }
  } catch (error) {
    res
      .status(200)
      .json({ flag: false, message: "plese verify using valid token" });
  }
};

module.exports = feactCompany;
