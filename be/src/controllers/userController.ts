import { Request, Response } from "express";
import User from "../models/User";
import {mapUsersToUsersDTO} from "../mappers/userMapper";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.json(mapUsersToUsersDTO(users))
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" })
    }
}

