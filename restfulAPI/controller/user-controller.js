const User = require("../model/user");
const { validationResult, body } = require("express-validator");
const httpErr = require("http-errors");
const bcrypt = require("bcryptjs");

const fetchUsers = async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
};

const fetchSingleUser = (req, res, next) => {
  res.send(req.params.id);
};

const userLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || null) {
      throw httpErr(404, "Email or password faild");
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      throw httpErr(404, "Email or password faild");
    }
    return res.json({ message: "Login successfull" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      return res.status(200).json(user);
    } else {
      throw httpErr(404, "User Not Found");
    }
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const result = validationResult(req);
  try {
    const user = await User.findById(id);

    if (user) {
      if (result.isEmpty()) {
        const result = await user.updateOne(req.body, { new: true });
        return res.json(result);
      } else {
        throw httpErr(400, result);
      }
    } else {
      throw httpErr(404, "User Not Found");
    }
  } catch (error) {
    next(error);
  }
};
const postUser = async (req, res, next) => {
  const user = new User(req.body);
  const result = validationResult(req);
  try {
    if (result.isEmpty()) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
      console.log(user);
      await user.save();
      res.status(201).json(user);
    } else {
      throw httpErr(400, result);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  fetchUsers,
  fetchSingleUser,
  userLogin,
  deleteUser,
  updateUser,
  postUser
};
