import User from "../models/user.model.js";

const handleUserSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: "User Sent Successfully!",
    });
  } catch (error) {
    res.send(error);
    console.log("res.send(error.message)", error);
  }
};

export default handleUserSignUp;
