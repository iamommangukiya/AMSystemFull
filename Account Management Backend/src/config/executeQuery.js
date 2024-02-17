const database = require("../database");

const db = database("user");

module.exports = (query, res) => {
  var result = db.query(query, (error, data) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.send(200);
    }
  });

  return result.values;
};
