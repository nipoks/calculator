import express from "express";
import {
    getHistoryExpressionByUser,
    addNewExpressionToHistory,
    getCurExpressionByUser, updateCurExpressionByUser
} from "../controllers/calculatorController";

const calculatorRouter = express.Router();

calculatorRouter.get("/history/:userId", getHistoryExpressionByUser);
calculatorRouter.post("/history", addNewExpressionToHistory);

calculatorRouter.get("/expression/:userId", getCurExpressionByUser);
calculatorRouter.post("/expression", updateCurExpressionByUser);

export default calculatorRouter;
