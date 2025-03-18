import User, {IUser} from "../models/User"
import bcrypt from "bcryptjs"
import HistoryExpression from "../models/HistoryExpression"

export const initUsers = async ():Promise<IUser[]> => {
    const users = [
        { email: "first@example.com", password: "12", curExpression: "65+10-5", memoryNumber: "10" },
        { email: "second@example.com", password: "13", curExpression: "0", memoryNumber: undefined }
    ]

    const hashedUsers = await Promise.all(
        users.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, 10)
        }))
    )

    try {
        return await User.insertMany(hashedUsers)
    } catch (error) {
        console.log("Ошибка при добавлении пользоватлей в базу:", error)
        return []
    }
}

export const initHistoryExpression = async (users:IUser[]) => {

    let currentDate = new Date()
    if (users.length < 1) {
        console.log("Нету пользоватлей для добавления истории в базу")
        return
    }
    const historyData = [
        {
            userId: users[0]._id,
            expression: "53-2x6+2 = 43",
            date: new Date(currentDate.getTime()),
        },
        {
            userId: users[0]._id,
            expression: "25x3-4+6÷8 = 71.75",
            date: new Date(currentDate.getTime() + 1000),
        },
        {
            userId: users[0]._id,
            expression: "71.75x5-2+2x3x5÷10 = 359.75",
            date: new Date(currentDate.getTime() + 2000),
        },
        {
            userId: users[0]._id,
            expression: "359.75x5-215+2.5x6 = 1598.75",
            date: new Date(currentDate.getTime() + 3000),
        },
        {
            userId: users[0]._id,
            expression: "1598.75-200 = 1398.75",
            date: new Date(currentDate.getTime() + 4000),
        },
        {
            userId: users[1]._id,
            expression: "71.75x5-2+2x3x5÷10 = 359.75",
            date: new Date(currentDate.getTime() + 6000),
        },
        {
            userId: users[1]._id,
            expression: "359.75x5-215+2.5x6 = 1598.75",
            date: new Date(currentDate.getTime() + 5000),
        },
    ]
    try {
        await HistoryExpression.insertMany(historyData)
        console.log("История вычислений добавлена")
    } catch (error) {
        console.log("Ошибка при добавлении истории в базу:", error)
    }
}

export const initDatabase = async () => {
    try {

        const savedUsers = await initUsers()
        await initHistoryExpression(savedUsers)

        console.log("Данные добавлены")
    } catch (error) {
        console.log("Ошибка при инициализации базы:", error)
    }
}