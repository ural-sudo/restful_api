const express = require("express");
const router = express.Router();
const httpErr = require('http-errors');

const User = require("../model/user");

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

router.post("/", async (req, res,next) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      const result = await user.updateOne(req.body, { new: true });
      
      return res.json(result);
    } else {
      throw httpErr(404,"User Not Found");
    }
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(user){
            
            return res.status(200).json(user);
        }else{
            throw httpErr(404,"User Not Found");
        }
    } catch (err) {
        
        next(err);
    }

});

module.exports = router;
