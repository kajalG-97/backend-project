import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DBConnection } from "../database/DBConnection.js";
import { errorMiddleware } from "./error/error.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import reservationRouter from "./routes/reservation.route.js";
import { authorizationMiddleware } from "./middleware/authentication.middleware.js";

const app = express();

dotenv.config();

const port = 6000;
// process.env.PORT ||
DBConnection(app, port);

// using json help to convert string to object
app.use(express.json());

//the process of converting string into valid URL format
app.use(express.urlencoded({ extended: true }));

// controllers
app.use("/api/v1/reservation", authorizationMiddleware, reservationRouter);
app.use("/api/v1/users", authorizationMiddleware, userRouter);
app.use("/api/v1", authRouter);

app.use((err, req, res, next) => {
  errorMiddleware({ message: err.message, status: err.status }, req, res, next);
});
