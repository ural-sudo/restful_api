const express = require("express");
const {emailValidator} = require('../core/validation/email-validation');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
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

router.post("/",emailValidator('email'), async (req, res,next) => {
  const user = new User(req.body);
  const result = validationResult(req);
  try {
    if(result.isEmpty()){
      user.password = await bcrypt.hash(user.password,10);
      await user.save();
      res.status(201).json(user);
    }else{
      
      throw httpErr(400,result);
    }
    
  } catch (error) { 
    console.log(error);
    next(error);
  }
  
});

router.patch("/:id",emailValidator('email'),async (req, res, next) => {
  const id = req.params.id;
  const result =validationResult(req);
  try {
    const user = await User.findById(id);
    
    if (user) {
      if(result.isEmpty()){
        const result = await user.updateOne(req.body, { new: true });
        return res.json(result);
      }else{
        throw httpErr(400,result);
      }
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
