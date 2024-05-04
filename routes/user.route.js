import express from "express";
import handleUserSignUp from "../controllers/user.controller";

const router = express.Router();

router.post("/", handleUserSignUp);

export default router;
