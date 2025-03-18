import express from "express";
import {
    getHistoryExpressionByUser,
    addNewExpressionToHistory,
    updateCurExpressionByUser,
    updateMemoryByUser,
    getCurExpressionMemoryByUser
} from "../controllers/calculatorController";
import {authMiddleware} from "../middleware/auth.middleware";

const calculatorRouter = express.Router();
calculatorRouter.use(authMiddleware);

calculatorRouter.get("/history/:userId", getHistoryExpressionByUser);
calculatorRouter.post("/history", addNewExpressionToHistory);

calculatorRouter.get("/expression/:userId", getCurExpressionMemoryByUser);
calculatorRouter.put("/expression", updateCurExpressionByUser);

calculatorRouter.put("/memory", updateMemoryByUser);

export default calculatorRouter;
