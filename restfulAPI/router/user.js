const express = require("express");
const { emailValidator } = require("../core/validation/email-validation");
const bcrypt = require("bcryptjs");
const router = express.Router();
const httpErr = require("http-errors");

const User = require("../model/user");
const {
  fetchUsers,
  fetchSingleUser,
  userLogin,
  deleteUser,
  updateUser,
  postUser,
} = require("../controller/user-controller");

router.get("/", fetchUsers);
router.get("/:id", fetchSingleUser);
router.post("/login", userLogin);
router.post("/", emailValidator("email"), postUser);
router.patch("/:id", emailValidator("email"), updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
