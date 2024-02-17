require("dotenv").config();
const mysql = require("mysql2");

const db = (name) => {
  const connection = mysql.createConnection({
    // database: name,
    // user: "root",
    // password: "",
    // host: "localhost",

    host: "barcodereder-syncajiodata.a.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_2PtTBa2uXIwoxpWfl-u",
    database: name,
    port: 26388,
  });

  connection.connect((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Database connected");
    }
  });
  if (connection.state === "disconnected") {
    // Reconnect or handle accordingly
    connection.connect(function (err) {
      if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
      }
      console.log("Connected to database with id " + connection.threadId);
    });
  }

  return connection;
};

module.exports = db;
