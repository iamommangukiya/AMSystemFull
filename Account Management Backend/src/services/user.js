const database = require("../database");
const db = database("user");
const Querys = require("../config/querys");
const Query = new Querys();
const JWT = require("jsonwebtoken");
const logError = require("../../errorLog");

class userServices {
  async singUp(userInputs, res) {
    let flag = false;

    try {
      // Check if user already exists
      var checkQuery = Query.checkUser(userInputs);
      db.query(checkQuery, (err, data) => {
        if (err) {
          logError(err.message);
          return res
            .status(500)
            .json({ message: "Internal Server Error", flag: false });
        }

        if (data.length > 0) {
          flag = false;
          return res
            .status(200)
            .json({ flag: flag, message: "Account already exists" });
        } else {
          // Create user if not already exists
          var creQuery = Query.singUp(userInputs);

          db.query(creQuery, (error) => {
            if (error) {
              logError(error.message);
              return res
                .status(500)
                .json({ message: "Internal Server Error", flag: false });
            } else {
              flag = true;
              return res
                .status(200)
                .json({ flag: flag, message: "Account Created successfully" });
            }
          });
        }
      });
    } catch (error) {
      logError(error.message);
      return res
        .status(500)
        .json({ message: "Internal Server Error", flag: false });
    }
  }
  async singIn(userInputs, res) {
    let flag = false;

    const key = process.env.JWT_KEY || "om@omangukiya";
    console.log(key);
    var Loginquery = Query.singIN(userInputs);
    db.query(Loginquery, (err, data) => {
      if (err) {
        res.send(200).json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      }

      if (data.length > 0) {
        const data1 = {
          user: {
            id: data[0]["id"],
          },
        };

        const token = JWT.sign(data1, key);
        const resdata = {
          data: data[0],
          auth_token: token,
        };
        flag = true;
        res
          .status(200)
          .json({ flag: flag, message: "Login successfully", data: resdata });
      } else {
        flag = false;
        res
          .status(200)
          .json({ flag: flag, message: "Password Or Email Incorrect " });
      }
    });
  }
  async update(userInputs, res) {
    let flag = false;
    var updateQuery = Query.updateUser(userInputs);
    db.query(updateQuery, (err, data) => {
      if (err) {
        res.send(200).json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      }
      res
        .status(200)
        .json({ flag: true, message: "Update Successfully", data: data });
    });
  }

  async createCompany(userInputs, res) {
    let flag = false;
    var query = Query.createCompany(userInputs);

    db.query(query, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        flag = true;
        var yearData = {
          ...data,
          date: userInputs["date"],
        };
        var inserYear = Query.insertFinancialYaer(yearData);
        db.query(inserYear, (err, data) => {
          if (err) {
            res
              .status(200)
              .json({ message: "Internal Server Error ", flag: false });

            logError(err.message);
          } else {
            res
              .status(200)
              .send({ flag: flag, message: "Company Created Successfully" });
          }
        });
      }
    });
  }

  async updateCompany(userInputs, res) {
    let flag = false;
    var query = Query.updateCompany(userInputs);
    db.query(query, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.affectedRows > 0) {
          flag = true;
          res
            .status(200)
            .json({ flag: flag, message: "Company updated Successfully" });
        } else {
          res.status(200).json({ flag: flag, message: "No Company Founded" });
        }
      }
    });
  }
  // featch Company

  async featchCompanybyid(userInputs, res) {
    let flag = false;
    var query = Query.featchCompanyid(userInputs);
    db.query(query, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.length > 0) {
          var data1 = {
            uid: userInputs.uid,
            id: data[0].id,
          };

          const key = process.env.JWT_KEY;
          let token = JWT.sign(data1, key);
          res.status(200).json({
            flag: true,
            companyId: token,
            message: "featch successfully",
            data: data,
          });
        } else {
          res
            .status(200)
            .json({ flag: flag, message: "Not Founded Registered Company" });
        }
      }
    });
  }

  // deleting company
  async deleteCommpany(id, res) {
    let flag = false;
    var query = Query.deleteCompany(id, res);
    db.query(query, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.affectedRows) {
          flag = true;
          res
            .status(200)
            .json({ flag: flag, message: "Company Deleted Successfully" });
        } else {
          res
            .status(200)
            .json({ flag: flag, message: "No Company Founded To delete" });
        }
      }
    });
  }

  async selectCompanyById(data, res) {
    let flag = false;

    var q = Query.selectCompany(data);
    db.query(q, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.length > 0) {
          flag = true;
          res.status(200).json({
            flag: flag,

            message: " company featch Successfully",
            data: data,
          });
        } else {
          res
            .status(200)
            .json({ flag: flag, message: "No Party Founded To select" });
        }
      }
    });
  }
  async selectFinancialYear(data, res) {
    let flag = false;
    var q = Query.selectFinancialYear(data);
    db.query(q, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.length > 0) {
          flag = true;
          res.status(200).json({
            flag: flag,
            data: data,
          });
        } else {
          res.status(200).json({ flag: flag, message: "no year founded" });
        }
      }
    });
  }
}

module.exports = userServices;
