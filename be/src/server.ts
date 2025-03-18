import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors"

import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(cors());
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)


app.listen(PORT, () => {
    console.log(`Запущен на порту ${PORT}`)
})

mongoose
    .connect(process.env.MONGO_URI as string, { dbName: process.env.DB_NAME })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));