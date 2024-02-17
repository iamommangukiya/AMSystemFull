const fs = require("fs");
const path = require("path");

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  //
  fs.mkdirSync(dirname);
}
function logError(errorMessage) {
  const currentdate = new Date();
  const date = currentdate.toISOString().slice(0, 10);
  const currentdatetime = currentdate.toISOString().slice(0, 18);
  const errorText =
    currentdatetime + "  : " + __filename + " : " + `${errorMessage}\n`;

  ensureDirectoryExistence(`errorLogs/errorLog-${date}.txt`);

  fs.appendFile(`errorLogs/errorLog-${date}.txt`, errorText, (err) => {
    if (err) {
      logError(err);
      console.error("Error appending to error log file:", err);
    }
  });
}
module.exports = logError;
