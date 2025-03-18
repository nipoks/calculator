import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors"

import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import calculatorRouter from "./routes/calculatorRoutes";
import { initDatabase } from "./init/initDB"

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(cors());
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/calculator", calculatorRouter)

mongoose
    .connect(process.env.MONGO_URI as string, { dbName: process.env.DB_NAME })
    .then(async () => {
        console.log("MongoDB connected")
        await initDatabase()
    })
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Запущен на порту ${PORT}`))
