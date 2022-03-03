import asyncHandler from "express-async-handler";
import User from "../models/usermodel.js";
import generateWebToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;

const Authuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateWebToken(user._id),
    });
  } else {
    res.sendStatus(401).send({ message: "Invalid email or password" });
    throw new Error("Invalid email or password");
  }
});

const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existuser = await User.findOne({ email });

  if (existuser) {
    res.sendStatus(400);
    throw new Error("User is already existed");
  }
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateWebToken(user._id),
    });
  } else {
    res.sendStatus(401);
    throw new Error("User not found");
  }
});

const UpdateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    const updateuser = await user.save();
    res.status(201).send(updateuser);
  } else {
    res.sendStatus(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const removeUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.remove();
    res.json({ message: "user removed" }).sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

const updateAdminUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    try {
      user.isAdmin = await req.body.updateadmin;
      console.log(user)
      user.save();
      res.json({ message: "sucessfully updated" }).sendStatus(200);
    } catch {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

export {
  Authuser,
  RegisterUser,
  UpdateUser,
  getUsers,
  removeUsers,
  updateAdminUser,
};
