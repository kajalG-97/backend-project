import express from "express";
import {
  getUserList,
  handleUserSignUp,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.get("", getUserList);

export default router;
