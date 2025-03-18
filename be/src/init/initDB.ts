import User, {IUser} from "../models/User";
import bcrypt from "bcryptjs";
import HistoryExpression from "../models/HistoryExpression";

export const initUsers = async ():Promise<IUser[]> => {
    const users = [
        { email: "first@example.com", password: "12" },
        { email: "second@example.com", password: "13" }
    ];

    const hashedUsers = await Promise.all(
        users.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, 10)
        }))
    );

    return await User.insertMany(hashedUsers);
}

export const initHistoryExpression = async (users:IUser[]) => {

    let currentDate = new Date()

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

    await HistoryExpression.insertMany(historyData);

    console.log("История вычислений добавлена");
}

export const initDatabase = async () => {
    try {

        const savedUsers = await initUsers()
        await initHistoryExpression(savedUsers)

        console.log("Данные добавлены");
    } catch (error) {
        console.error("Ошибка при инициализации базы:", error);
    }
};