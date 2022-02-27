const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { restart } = require("nodemon");

//@desc Register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  //Hash the password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  //Create Users

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  //   res.json({ message: "registered user" });
});

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Check for user email
  const user = await User.findOne({ email });

  //Check for user password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc Get a user data
//@route POST /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  // const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json(req.user);
});

//Genereate a JWT token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
