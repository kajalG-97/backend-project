import express from "express";
import mongoose from "mongoose";
import { DBConnection } from "../database/DBConnection.js";
import { errorMiddleware } from "../error/error.js";
import authController from "../controllers/auth.controller.js";
import reservationRouter from "../routes/reservation.route.js";

const app = express();

const port = process.env.PORT || 6000;

DBConnection(app, port);

// using json help to convert string to object
app.use(express.json());

//the process of converting string into valid URL format
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {});

// controllers
app.use("/api/v1/reservation", reservationRouter);

app.use((err, req, res, next) => {
  errorMiddleware({ message: err.message, status: err.status }, req, res, next);
});
