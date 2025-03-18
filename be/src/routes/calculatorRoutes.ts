import express from "express";
import { getHistoryExpressionByUser, addNewExpressionToHistory } from "../controllers/calculatorController";

const calculatorRouter = express.Router();

calculatorRouter.get("/history/:userId", getHistoryExpressionByUser);
calculatorRouter.post("/history", addNewExpressionToHistory);

export default calculatorRouter;
