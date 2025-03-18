import { Request, Response } from "express";
import HistoryExpression from "../models/HistoryExpression";
import {mapUsersToUsersDTO} from "../mappers/calculatorMapper";

export const getHistoryExpressionByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const history = await HistoryExpression.find({ userId }).sort({ date: -1 });

        // if (!history.length) {
        //     res.status(404).json({ message: "История не найдена" });
        //     return;
        // }

        res.json(mapUsersToUsersDTO(history));
    } catch (error) {
        console.error("Ошибка при получении истории:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

// Добавить новую запись в историю
export const addNewExpressionToHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, expression } = req.body;

        if (!userId || !expression) {
            res.status(400).json({ message: "Необходимо указать userId и expression" });
            return;
        }

        const newRecord = new HistoryExpression({ userId, expression });
        await newRecord.save();

        res.status(201).json(mapUsersToUsersDTO([newRecord])[0]);
    } catch (error) {
        console.error("Ошибка при добавлении записи:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
