import User from "../models/user.model.js";

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
