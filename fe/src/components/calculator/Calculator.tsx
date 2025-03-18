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
    const [history, setHistory] = useState([])
    const [memoryNumber, setMemoryNumber] = useState<number | undefined>(undefined)
    const [accuracyCalc] = useState(6)
    const { authState } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchHistory = async () => {
            if (!authState || !authState.id) {
                navigate('/login');
            }
            const resHistory = await getHistory({
                idUser: authState!.id,
            })
            console.log(resHistory)
            //setHistory(resHistory)

            const resExpression = await getExpression({
                idUser: authState!.id,
            })
            console.log(resExpression)
            //setExpression(resExpression)
        }

        const fetchData = async () => {
            if (!authState || !authState.id) {
                navigate('/login');
            }
            const response = await updateCurUserExpression({
                idUser: authState!.id,
                expression: expression,
            })
            console.log("Ответ с бэка:", response);
        }; 

        fetchHistory();
        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    }, [])



    const handleButtonClick = async (value: string) => {
        console.log(expression, value)

        if (expression === "Error") {
            if (value !== "=") {
                if (!isNaN(Number(value))) {
                    setExpression(value === "=" ? "Error" : value)
                }
                if (value === "C") {
                    setExpression("0")
                }
            }
            return
        }

        if (!isNaN(Number(value))) {
            setExpression(expression === "0" ? value : expression + value)
        } else if (value === "C") {
            setExpression("0")
        } else if (value === "CE") {
            setExpression(expression.slice(0, -1) || "0")
        } else if (value === "+/-" && !isNaN(Number(expression)) && expression !== "0") {
            setExpression(
                expression.startsWith("-")
                    ? expression.slice(1)
                    : `-${expression}`
            )
        } else if (value === ".") {
            if (
                !["+", "-", "x", "÷", "."].includes(expression.slice(-1))
            ) {
                setExpression(expression + `${value}`)
            }
        } else if (["+", "-", "x", "÷"].includes(value)) {
            if (
                !["+", "-", "x", "÷"].includes(expression.slice(-1)) &&
                expression !== "0"
            ) {
                setExpression(expression + `${value}`)
            } else if (["+", "-", "x", "÷"].includes(expression.slice(-1))) {
                setExpression(expression.slice(0, -1) + `${value}`)
            }

        } else if (value === "=") {
            try {
                const finalExpression = expression
                    .replace(/x/g, "*")
                    .replace(/÷/g, "/")
                const result = eval(finalExpression)
                let resultWithFourDecimalPlaces = result
                if (result % 1 !== 0) {
                    resultWithFourDecimalPlaces = parseFloat(result.toFixed(accuracyCalc))
                }
                const newEntry = `${expression} = ${resultWithFourDecimalPlaces}`
                setHistory([newEntry, ...history])
                setExpression(resultWithFourDecimalPlaces.toString())

                try {
                    await addNewExpressionToHistory({
                        idUser: authState!.id,
                        expression: newEntry,
                    })
                } catch (err) {
                    console.log(err)
                }

            } catch (error) {
                console.error(error)
                setExpression("Error")
            }
        } else if (value === "ms") {
            if (!isNaN(Number(expression))) {
                setMemoryNumber(Number(expression))
            }
        } else if (value === "mr") {
            if (memoryNumber !== undefined) {
                setExpression(memoryNumber.toString())
            }
        } else if (value === "mc") {
            setMemoryNumber(undefined)

        } else if (value === "m-") {
            if (!isNaN(Number(expression)) && memoryNumber) {
                setMemoryNumber(prevState => prevState! - Number(expression))
            }
        } else if (value === "m+") {
            if (!isNaN(Number(expression)) && memoryNumber) {
                setMemoryNumber(prevState => prevState! + Number(expression))
            }
        }
    }

    return (
        <>
            <div className="calculator">
                {history.length > 0 && (
                    <div className="history-container">
                        {history.map((item, index) => (
                            <div key={index} className="history-item">
                                {item}
                            </div>
                        ))}
                    </div>
                )}
                <div className="display">{expression}</div>
                <div className="buttons">
                    {buttons.flat().map((btn, index) => (
                        <div key={index}>
                            <button
                                className={`${
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
