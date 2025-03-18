import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User"
import dotenv from 'dotenv'

dotenv.config()

const generateTokens = (userId: string, email: string) => {

    const accessToken = jwt.sign(
        { userId, email },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    )

    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' }
    )

    return { accessToken, refreshToken }
}

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "Пользователь уже существует" })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ email, password: hashedPassword })
        await user.save()

        res.status(201).json({ message: "Пользователь зарегистрирован" })
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({ message: "Неверные учетные данные" })
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: "Неверные учетные данные" })
            return
        }

        const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.email)

        res.json({ accessToken, refreshToken })
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" })
    }
}

export const refresh = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        res.status(401).json({ message: "Требуется токен обновления" })
        return
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as jwt.JwtPayload

        if (!decoded || !decoded.userId) {
            res.status(403).json({ message: "Невалидный токен обновления" })
            return
        }

        const user = await User.findOne(decoded.userId)
        if (!user) {
            res.status(403).json({ message: "Пользователя с таким id не существует" })
            return
        }
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId, user.email)

        res.json({ accessToken, refreshToken: newRefreshToken })
    } catch (error) {
        res.status(403).json({ message: "Невалидный токен обновления" })
    }
}
