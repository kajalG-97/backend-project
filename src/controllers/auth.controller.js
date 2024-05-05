import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

export const generateToken = (payload, expiryTime = "10d", extra = {}) => {
  try {
    const token = jwt.sign(
      { userId: payload, ...extra },
      process.env.JWT_SECRET_KEY,
      { expiresIn: expiryTime }
    );
    return token;
  } catch (error) {
    console.error("token creation failed", error);
    throw error;
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newErrors;
      newErrors = errors.array().map((err) => {
        return { key: err.param, message: err.msg };
      });
      return res.status(400).send({ errors: newErrors });
    }
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user)
      return res.status(400).send({ message: "Please try another email" });

    user = await User.create(req.body);

    const token = newToken(user);

    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newErrors;
      newErrors = errors.array().map((err) => {
        return { key: err.param, message: err.msg };
      });
      return res.status(400).send({ errors: newErrors });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .send({ message: "Please try another email or password" });

    const match = user.checkPassword(req.body.password);

    if (!match)
      return res
        .status(400)
        .send({ message: "Please try another email or password" });

    const token = newToken(user);

    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
