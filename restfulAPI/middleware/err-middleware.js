const catchErr = (err, req, res, next) => {
  res.json({
    message:err.message,
    errCode:err.statusCode
  });
};

module.exports = catchErr;
