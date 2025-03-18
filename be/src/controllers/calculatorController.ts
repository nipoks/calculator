import { Request, Response } from "express"
import HistoryExpression from "../models/HistoryExpression"
import {mapUsersToUsersDTO} from "../mappers/calculatorMapper"
import User from "../models/User";

export const getHistoryExpressionByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params
        const history = await HistoryExpression.find({ userId }).sort({ date: -1 })
        

        res.json(mapUsersToUsersDTO(history))
    } catch (error) {
        console.error("Ошибка при получении истории:", error)
        res.status(500).json({ message: "Ошибка сервера" })
    }
}

export const addNewExpressionToHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, expression } = req.body

        if (!userId || !expression) {
            res.status(400).json({ message: "Необходимо указать userId и expression" })
            return
        }

        const newRecord = new HistoryExpression({ userId, expression })
        await newRecord.save()

        res.status(201).json(mapUsersToUsersDTO([newRecord])[0])
    } catch (error) {
        console.error("Ошибка при добавлении записи:", error)
        res.status(500).json({ message: "Ошибка сервера" })
    }
}

export const getCurExpressionByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params
        console.log("UserId =", userId)
        const user = await User.findOne({ _id: userId })
        if (!user) {
            res.status(404).json({ message: "Пользователь не найден" })
            return
        }

        console.log(user, user.curExpression)
        res.json(user.curExpression)
    } catch (error) {
        console.error("Ошибка при получении истории:", error)
        res.status(500).json({ message: "Ошибка сервера" })
    }
}

export const updateCurExpressionByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, expression } = req.body
        const result = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { curExpression: expression } },
            { new: true }
        )
        if (!result) {
            res.status(404).json({ message: "Пользователь не найден" })
            return
        }

        res.json(result?.curExpression)
    } catch (error) {
        console.error("Ошибка при получении истории:", error)
        res.status(500).json({ message: "Ошибка сервера" })
    }
}