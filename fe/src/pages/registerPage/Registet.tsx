import { useState } from 'react'
import "./Register.css"
import "../loginPage/Login.css"
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../context/authContext/authContext.ts";

export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repPassword, setRepPassword] = useState('')
    const [error, setError] = useState('');
    const { authClient } = useAuthContext()

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== repPassword) {
            setError('Пароли не совпадают');
            setPassword('')
            setRepPassword('')
            return;
        }
        setError('');
        await authClient.register({
            email: email,
            password: password
        })

        navigate('/login')
    }

    return (
        <div className="register-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-input-container">
                    <label htmlFor="email" className="register-label">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите вашу почту"
                        required
                        className="register-input"
                    />
                </div>
                <div className="register-input-container">
                    <label htmlFor="password" className="register-label">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите ваш пароль"
                        required
                        className="register-input"
                    />
                </div>
                <div className="register-input-container">
                    <label htmlFor="password" className="register-label">Повторите пароль</label>
                    <input
                        type="password"
                        id="repPassword"
                        name="repPassword"
                        value={repPassword}
                        onChange={(e) => setRepPassword(e.target.value)}
                        placeholder="Повторите пароль"
                        required
                        className="register-input"
                    />
                </div>
                {error && <div className="register-error-message">{error}</div>}

                <button type="submit" className="register-button">Зарегистрировать</button>
                <button type="button" onClick={() => navigate(`/login`)} className="login-button-to-register">Есть аккаунт? Войдите</button>
            </form>
        </div>
    )
}
