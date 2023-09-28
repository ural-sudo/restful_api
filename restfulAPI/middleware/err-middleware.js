const catchErr = (err, req, res, next) => {
  res.json({
    message:err.message
  });
};

module.exports = catchErr;
