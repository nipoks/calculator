import express from "express";
import { refresh, login, register } from "../controllers/authController";

const authRouter = express.Router()

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);

export default authRouter
