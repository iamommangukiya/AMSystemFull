const express = require("express");
const expressApp = require("./express-app");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

expressApp(app);

app.listen(PORT, () => {
  console.log(`api listion on http://localhost:${PORT}`);
});
