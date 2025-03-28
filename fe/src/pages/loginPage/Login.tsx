import { useState } from 'react'
import "./Login.css"
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../context/authContext/authContext.ts";
import {ServerError} from "../../api/createRequest.ts";

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const navigate = useNavigate()
    const { authClient } = useAuthContext()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');

            await authClient.login({
                email: email,
                password: password,
            });

            navigate('/');
        } catch (error: unknown) {
            if (error instanceof ServerError) {
                if (error.code === 400) {
                    setError('Неверный логин или пароль');
                } else {
                    setError(error.message);
                }
            } else {
                console.error("Неизвестная ошибка");
            }
        }
    };


    return (
        <div className="login-container">
            <h2>Вход</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-input-container">
                    <label htmlFor="email" className="login-label">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите вашу почту"
                        required
                        className="login-input"
                        autoComplete="username"
                    />
                </div>
                <div className="login-input-container">
                    <label htmlFor="password" className="login-label">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите ваш пароль"
                        required
                        className="login-input"
                        autoComplete="current-password"
                    />
                    {error && <div className="register-error-message">{error}</div>}
                </div>
                <button type="submit" className="login-button">Войти</button>
                <button type="button" onClick={() => navigate(`/register`)} className="login-button-to-register">Зарегистрироваться</button>

            </form>
        </div>
    )
}
