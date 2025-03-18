import { useState } from 'react'
import "./Login.css"
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../context/authContext/authContext.ts";
import {createRequest} from "../../api/createRequest.ts";

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { authClient } = useAuthContext()

    const backendUrlPrefix = import.meta.env.VITE_BACKEND_URL

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res2 = await authClient.login({
            email: email,
            password: password,
        });
        console.log('res2: ', res2);

        navigate('/');
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
                </div>
                <button type="submit" className="login-button">Войти</button>
                <button type="button" onClick={() => navigate(`/register`)} className="login-button-to-register">Зарегистрироваться</button>

            </form>
        </div>
    )
}
