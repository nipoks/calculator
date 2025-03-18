import { useState } from 'react'
import "./Login.css"
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../context/authContext/authContext.ts";

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const navigate = useNavigate()
    const { authClient } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');

            const res2 = await authClient.login({
                email: email,
                password: password,
            });
            console.log('res2: ', res2);

            navigate('/');
        } catch (error) {
            if (error.code === 400) {
                setError('Неверный логин или пароль');
            } else {
                setError(error.message);
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
