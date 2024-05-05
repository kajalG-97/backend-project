import User from "../models/user.model.js";

export const handleUserSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: "User Sent Successfully!",
    });

    return res.status(200).send(user);
  } catch (error) {
    res.send(error);
    console.log("res.send(error.message)", error);
  }
};

export const getUserList = async (req, res) => {
  try {
    const sort = {};

    if (req.query.sortBy && req.query.OrderBy) {
      sort[req.query.sortBy] = req.query.OrderBy === "desc" ? -1 : 1;
    }

    let users = await User.find().sort(sort).lean().exec();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
