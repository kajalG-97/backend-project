import { json } from "stream/consumers";
import ErrorHandler from "../error/error.js";
import Reservation from "../models/reservation.model.js";

const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time } = req.body;
  if (!firstName || !lastName || !email || !phone) {
    return next(new ErrorHandler("Please fill full reservation form!"));
  }

  try {
    await Reservation.create({ firstName, lastName, email, phone, date, time });

    res.status(200).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    res.send(error.message);
    console.log("res.send(error.message)", error);
  }
};

export default sendReservation;
