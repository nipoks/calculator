import {useEffect, useState} from "react"
import "./Calculator.css"

import {useAuthContext} from "../../context/authContext/authContext.ts";
import {useNavigate} from "react-router-dom";
import {
    addNewExpressionToHistory,
    getExpression,
    getHistory,
    updateCurUserExpression
} from "../../api/calculator/calculator.requests.ts";
import {HistoryItem} from "../../api/calculator/calculator.types.ts";

const buttons = [
    ["ms", "mr", "mc", "m-"],
    ["C", "CE", "+/-", "m+"],
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "x"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
]

export const Calculator = () => {
    const [expression, setExpression] = useState("0")
    const [historyExpression, setHistoryExpression] = useState<HistoryItem[] | undefined>(undefined)
    const [memoryNumber, setMemoryNumber] = useState<number | undefined>(undefined)
    const [accuracyCalc] = useState(6)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { authState, authClient } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchHistory = async () => {
            if (!authState || !authState.id) {
                navigate('/login')
                return
            }
            const resHistory = await getHistory({
                userId: authState!.id,
            })

            if (resHistory) {
                setHistoryExpression(resHistory);
            } else {
                console.log("No history found or wrong format");
            }

            const resExpression = await getExpression({
                userId: authState!.id,
            })
            console.log(resExpression)
            if (resExpression) {
                setExpression(resExpression)
            }
            setIsLoading(false)
        }
        fetchHistory()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                await updateCurUserExpression({
                    userId: authState!.id,
                    expression: expression,
                })
            } catch (error) {
                console.error(`Ошибка обновления текущего выражения: ${error}`)
            }
        }
        if (isLoading) return
        fetchData()
    }, [expression]);

    const handlerValueIsNumber = (value: string) => {
        if (expression.length > 2 && expression.slice(-1) === "0" && ["+", "-", "x", "÷"].includes(expression.slice(-2, -1))) {
            setExpression(expression.slice(0, -1) + value)
        } else {
            setExpression(expression === "0" ? value : expression + value)
        }
    }

    const handlerValueIsChangeSign = () => {
        setExpression(
            expression.startsWith("-")
                ? expression.slice(1)
                : `-${expression}`
        )
    }

    const handlerValueIsPoint = () => {
        if (
            !["+", "-", "x", "÷", "."].includes(expression.slice(-1))
        ) {
            setExpression(expression + ".")
        }
    }

    const handlerValueIsArithmeticOperation = (value: string) => {
        if (
            !["+", "-", "x", "÷"].includes(expression.slice(-1)) &&
            expression !== "0"
        ) {
            setExpression(expression + `${value}`)
        } else if (["+", "-", "x", "÷"].includes(expression.slice(-1))) {
            setExpression(expression.slice(0, -1) + `${value}`)
        }
    }

    const handlerValueIsEqualSign = async () => {
        try {
            const finalExpression = expression
                .replace(/x/g, "*")
                .replace(/÷/g, "/")
            const result = eval(finalExpression)
            let resultWithFourDecimalPlaces = result
            if (result % 1 !== 0) {
                resultWithFourDecimalPlaces = parseFloat(result.toFixed(accuracyCalc))
            }
            if (resultWithFourDecimalPlaces.toString() === "Infinity") {
                resultWithFourDecimalPlaces = "DivisionByZero"
            }
            console.log(resultWithFourDecimalPlaces)
            const newEntry = `${expression} = ${resultWithFourDecimalPlaces}`
            try {
                const res = await addNewExpressionToHistory({
                    userId: authState!.id,
                    expression: newEntry,
                })
                console.log("New record added:", res)

                setHistoryExpression(prevState => prevState ? [res, ...prevState] : [res])
            } catch (err) {
                console.log(err)
            }
            setExpression(resultWithFourDecimalPlaces.toString())

        } catch (error) {
            console.error(error)
            setExpression("Error")
        }
    }

    const handlerExpressionIsErrorOrDBZ = (value: string) => {
        if (value !== "=") {
            if (!isNaN(Number(value))) {
                setExpression(value)
            }
            if (value === "C") {
                setExpression("0")
            }
        }
        return
    }

    const memoryActions:{ [key: string]: () => void } = {
        "ms": () => {
            if (!isNaN(Number(expression))) {
                setMemoryNumber(Number(expression))
            }
        },
        "mr": () => setExpression(memoryNumber !== undefined ? memoryNumber.toString() : "0"),
        "mc": () => setMemoryNumber(undefined),
        "m-": () => {
            if (!isNaN(Number(expression)) && memoryNumber !== undefined) {
                setMemoryNumber(prevState => prevState! - Number(expression))
            }
        },
        "m+": () => {
            if (!isNaN(Number(expression)) && memoryNumber !== undefined) {
                setMemoryNumber(prevState => prevState! + Number(expression))
            }
        },
        "C": () => setExpression("0"),
        "CE": () => setExpression(expression.slice(0, -1) || "0"),
        ".": () => handlerValueIsPoint(),
        "=": async () => await handlerValueIsEqualSign(),

    }

    const handleButtonClick = async (value: string) => {
        if (expression === "Error" || expression === "DivisionByZero") {
            handlerExpressionIsErrorOrDBZ(value)
        }

        if (!isNaN(Number(value))) {
            handlerValueIsNumber(value)
        } else if (value === "+/-" && !isNaN(Number(expression)) && expression !== "0") {
            handlerValueIsChangeSign()
        } else if (["+", "-", "x", "÷"].includes(value)) {
            handlerValueIsArithmeticOperation(value)
        } else {
            memoryActions[value]()
        }
    }

    const handlerLogout = () => {
        authClient.logout()
        navigate(`/login`)
    }

    if (isLoading) {
        return <></>
    }

    return (
        <>
            <button className={'calculator-button-to-exit'} onClick={handlerLogout}>Выйти</button>
            <div className="calculator">
                {historyExpression && historyExpression.length > 0 && (
                    <div className="history-container">
                        {historyExpression.map((item) => (
                            <div key={item.id} className="history-item">
                                {item.expression}
                            </div>
                        ))}
                    </div>
                )}
                <div className="display">{expression}</div>
                <div className="buttons">
                    {buttons.flat().map((btn, index) => (
                        <div key={index}>
                            <button
                                className={`button button-${
                                    ["C", "CE", "+/-"].includes(btn)
                                        ? "clear"
                                        : ["÷", "x", "-", "+", "="].includes(btn)
                                            ? "operator"
                                            : "number"
                                }`}
                                onClick={() => handleButtonClick(btn)}
                            >
                                {btn}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="legend-container">
                <div>"ms"  - Записывает в память число, которое на экране.</div>
                <div>"mr"  - Выводит число из памяти на экран.</div>
                <div>"mc"  - Удаляет число из памяти.</div>
                <div>"m-"  - Вычитает число на экране из числа, записанного в памяти.</div>
                <div>"m+"  - Прибавляет число на экране к числу, записанному в памяти.</div>
            </div>
        </>
    )
}
