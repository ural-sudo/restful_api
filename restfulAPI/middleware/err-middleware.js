const ValidationString = require("../core/constants/string-constants");

const catchErr = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.json({ message: ValidationString.duplicateEmail });
  }
  
  console.log(err);
  if (err.name == "CastError") {
    return res.json({ message: "dasdasdasdasdasda" });
  }
  
  return res.status(err.statusCode).json(err);
  
};

module.exports = catchErr;
