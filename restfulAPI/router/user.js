const express = require("express");
const router = express.Router();

const User = require("../model/user");

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      const result = await user.updateOne(req.body, { new: true });
      
      return res.json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(user){
            
            return res.status(200).json(user);
        }else{
            res.status(400).json({"message":"Kullanıcı Bulunamadı"});
        }
    } catch (error) {
        
        res.json(error);
    }

});

module.exports = router;
