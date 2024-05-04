import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First Name must contain at least 3 character"],
      maxLength: [20, "First Name can not exceed 20 character"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last Name must contain at least 3 character"],
      maxLength: [20, "Last Name can not exceed 20 character"],
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: true,
      minLength: [10, "Phone Number Name must contain 10 digits"],
      maxLength: [10, "Phone Number Name must contain 10 digits"],
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Reservation = mongoose.model("reservation", reservationSchema);

export default Reservation;
