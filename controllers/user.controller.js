import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import { validationResult } from "express-validator";

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Incorrect data!" });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password or email!" });
    }
    const token = jwt.sign({ id: user._id }, config.get("SecretKeyJWT"), {
      expiresIn: "1h",
    });
    res.status(200).json({ token, role: user.role, userId: user._id });
  } catch (e) {
    res.status(400).json({ message: "Try again!" });
  }
};

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Incorrect data!" });
    }
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "User alreaady exist!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let role;
    if (email.substring(email.length - 3) == "aem") role = "Admin";
    else if (email.substring(email.length - 3) == "tem") role = "Trainer";
    else if (email.substring(email.length - 3) == "wem") role = "Worker";
    else role = "Client";
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      name: " ",
      surname: " ",
      age: 0,
      avatarUrl: " ",
    });
    await newUser.save();
    res.status(200).json({ message: "New user was created!" });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong.Try again!" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne(req.id);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: "Info error!" });
  }
};

const updateInfo = async (req, res) => {
  try {
    const userId = req.body.id;
    await User.updateOne(
      {
        _id: userId,
      },
      {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        age: req.body.age,
        avatarUrl: req.body.avatarUrl,
      }
    );
    res.status(200).json({ message: "User was updated!" });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export { login, signup, getUserInfo, updateInfo };
