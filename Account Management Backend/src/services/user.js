const database = require("../database");
const db = database("user");
const Querys = require("../config/querys");
const Query = new Querys();
const JWT = require("jsonwebtoken");
const logError = require("../../errorLog");
const nodemailer = require("nodemailer");
const redis = require("redis");
// import { createClient } from "redis";
const redisClient = redis.createClient({
  password: "8LmnwdSJQ2SWO0GRxkja3SXODT3exXXq",
  socket: {
    host: "redis-15205.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 15205,
  },
});
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail as the email service
  auth: {
    user: "gkusomg@gmail.com", // Your email address
    pass: "cwhm pykw vghi nupo", // Your email password
  },
});
redisClient.connect();
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
    redisClient.get(`otp:${userInputs.email}`, async (err, storedOTP) => {
      if (err) {
        logError(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", flag: false });
      }

      if (storedOTP === otp) {
        // Register user in MySQL database
        this.createAccountFun(userInputs, res); // Assuming registerUser is an asynchronous function

        // Delete OTP from Redis after successful verification
        redisClient.del(`otp:${email}`);

        return res
          .status(200)
          .json({ message: "User registered successfully", flag: true });
      } else {
        return res.status(400).json({ message: "Invalid OTP", flag: false });
      }
    });
    redisClient.disconnect();
  }
  //generate otp fun
  generateOTP() {
    // Generate a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000);
  }
  //create Account fun
  async createAccountFun(userInputs, res) {
    var flag = false;
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
  // otp send fun
  async sendOTPEmail(email, otp, res) {
    try {
      // Email options
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

      // Send the email
      await transporter.sendMail(mailOptions);
      return res
        .status(200)
        .json({ message: "otp sended SucsessFully", flag: true });
    } catch (error) {
      return res
        .status(200)
        .json({ message: "Error sending OTP email:", flag: false });
    }
  }

  async singIn(userInputs, res) {
    let flag = false;

    const key = process.env.JWT_KEY || "om@omangukiya";
    console.log(key);
    var Loginquery = Query.singIN(userInputs);
    db.query(Loginquery, (err, data) => {
      if (err) {
        console.log(err);
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
}

module.exports = userServices;
