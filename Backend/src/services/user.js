const database = require("../database");
const db = database("user");
const Querys = require("../config/querys");
const Query = new Querys();
const JWT = require("jsonwebtoken");
const logError = require("../../errorLog");
const nodemailer = require("nodemailer");
const redis = require("redis");
const redisClient = redis.createClient({
  password: "8LmnwdSJQ2SWO0GRxkja3SXODT3exXXq",
  socket: {
    host: "redis-15205.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 15205,
  },
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gkusomg@gmail.com",
    pass: "cwhm pykw vghi nupo",
  },
});
redisClient.connect();

class userServices {
  async singUp(userInputs, res) {
    try {
      var checkQuery = Query.checkUser(userInputs);
      db.query(checkQuery, (err, data) => {
        if (err) {
          logError(err.message);
          return res
            .status(500)
            .json({ message: "Internal Server Error", flag: false });
        }
        if (data.length > 0) {
          return res
            .status(200)
            .json({ flag: false, message: "Account already exists" });
        } else {
          var email = userInputs.email;
          var otp = this.generateOTP();
          const expirationTime = 300;
          redisClient.set(`otp:${email}`, otp);
          redisClient.expire(`otp:${email}`, expirationTime);
          this.sendOTPEmail(email, otp, res);
        }
      });
    } catch (error) {
      logError(error.message);
      return res
        .status(500)
        .json({ message: "Internal Server Error", flag: false });
    }
  }

  async varifyOtp(userInputs, res) {
    const email = userInputs.email;
    // console.log(email);

    // Retrieve stored OTP from Redis
    const storedOTP = await redisClient.get(`otp:${email}`);

    if (storedOTP) {
      const providedOTP = userInputs.otp;
      if (storedOTP === providedOTP) {
        // OTP is valid, proceed with account creation
        try {
          await this.createAccountFun(userInputs);
          await redisClient.del(`otp:${email}`);
          return res
            .status(200)
            .json({ message: "User registered successfully", flag: true });
        } catch (error) {
          logError(error.message);
          return res
            .status(500)
            .json({ message: "Internal Server Error", flag: false });
        }
      } else {
        // Invalid OTP, send error response
        return res.status(200).json({ message: "Invalid OTP", flag: false });
      }
    } else {
      // OTP not found, send error response
      return res.status(200).json({ message: "OTP not found", flag: false });
    }
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async createAccountFun(userInputs) {
    return new Promise((resolve, reject) => {
      var creQuery = Query.singUp(userInputs);
      db.query(creQuery, (error, data) => {
        if (error) {
          logError(error.message);
          reject({ message: "Internal Server Error", flag: false });
        } else {
          resolve({ flag: true, message: "Account Created successfully" });
        }
      });
    });
  }

  async sendOTPEmail(email, otp, res) {
    try {
      const mailOptions = {
        from: "AmsSystem ",
        to: email,
        subject: "Verify Your Email Address for AmsSystem",
        html: `
          <h2>Verify Your Email Address for AmsSystem</h2>
          <p>Thank you for registering with AmsSystem. To complete your registration, please use the following OTP (One-Time Password):</p>
          <p style="font-size: 24px; font-weight: bold;">Your otp: <span style="color: #007bff;">${otp}</span></p>
          <p>This OTP is valid for a single use and should not be shared with anyone else.</p>
          <p>If you did not register with AmsSystem, please ignore this email.</p>
          <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
          <p>Best regards,<br>AmsSystem Team</p>
        `,
      };
      await transporter.sendMail(mailOptions);
      return res
        .status(200)
        .json({ message: "otp sended SucsessFully", flag: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error sending OTP email:", flag: false });
    }
  }

  async singIn(userInputs, res) {
    const key = process.env.JWT_KEY || "om@omangukiya";
    var Loginquery = Query.singIN(userInputs);
    db.query(Loginquery, (err, data) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal Server Error ", flag: false });
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
        res
          .status(200)
          .json({ flag: true, message: "Login successfully", data: resdata });
      } else {
        res
          .status(200)
          .json({ flag: false, message: "Password Or Email Incorrect " });
      }
    });
  }
  async update(userInputs, res) {
    let flag = false;
    var updateQuery = Query.updateUser(userInputs);
    // console.log(updateQuery);
    db.query(updateQuery, (err, data) => {
      if (err) {
        res.send(200).json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        res
          .status(200)
          .json({ flag: true, message: "Update Successfully", data: data });
      }
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
  // featch CompanyFit
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

  //admin
  async singUpAdmin(userInputs, res) {
    try {
      var checkQuery = Query.checkAdminUser(userInputs);
      db.query(checkQuery, (err, data) => {
        if (err) {
          logError(err.message);
          return res
            .status(500)
            .json({ message: "Internal Server Error", flag: false });
        }
        if (data.length > 0) {
          return res
            .status(200)
            .json({ flag: false, message: "Account already exists" });
        } else {
          var signUpQuery = Query.signUpAdminUser(userInputs);
          db.query(signUpQuery, (err, result) => {
            if (err) {
              logError(err.message);
              return res
                .status(500)
                .json({ message: "Internal Server Error", flag: false });
            }
            return res.status(200).json({
              flag: true,
              message: "Admin account created successfully",
            });
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
  async SingInAdmin(userInputs, res) {
    const key = process.env.JWT_KEY || "om@omangukiya";
    var Loginquery = Query.singInAdmin(userInputs);
    db.query(Loginquery, (err, data) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal Server Error ", flag: false });
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
        res
          .status(200)
          .json({ flag: true, message: "Login successfully", data: resdata });
      } else {
        res
          .status(200)
          .json({ flag: false, message: "Password Or Email Incorrect " });
      }
    });
  }
  async selectAlluser(res) {
    let flag = false;
    var query = Query.selectAlluser();
    db.query(query, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.length > 0) {
          res.status(200).json({
            flag: true,

            message: "featch successfully",
            data: data,
          });
        } else {
          res.status(200).json({ flag: flag, message: "Not Founded users" });
        }
      }
    });
  }
  async selectUserByid(userDAta, res) {
    let flag = false;
    var query = Query.selectuserByid(userDAta.id);
    db.query(query, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.length > 0) {
          res.status(200).json({
            flag: true,

            message: "featch successfully",
            data: data,
          });
        } else {
          res.status(200).json({ flag: flag, message: "Not Founded users" });
        }
      }
    });
  }
  async deletuser(userdata, res) {
    let flag = false;
    var query = Query.deleteUser(userdata);
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
            .json({ flag: flag, message: "user Deleted Successfully" });
        } else {
          res
            .status(200)
            .json({ flag: flag, message: "No user Founded To delete" });
        }
      }
    });
  }
  async cmpbyid(userdata, res) {
    let flag = false;
    var query = Query.featchCompanyUserId(userdata.id);
    // console.log(query);
    db.query(query, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.length > 0) {
          var data1 = {
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
  async allcmp(res) {
    let flag = false;
    var query = Query.allcmp();
    db.query(query, (err, data) => {
      if (err) {
        res
          .status(200)
          .json({ message: "Internal Server Error ", flag: false });

        logError(err.message);
      } else {
        if (data.length > 0) {
          flag = true;
          res
            .status(200)
            .json({ flag: flag, message: "featch Successfully", data: data });
        } else {
          res.status(200).json({ flag: flag, message: "No Founded " });
        }
      }
    });
  }
}

module.exports = userServices;
