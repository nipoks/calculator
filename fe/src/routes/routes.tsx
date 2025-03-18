import React from 'react'
import {Login} from "../pages/loginPage/Login.tsx";
import {Main} from "../pages/mainPage/Main.tsx";
import {Register} from "../pages/registerPage/Registet.tsx";

interface RouteProps {
    page:  React.ComponentType
    path: string
}

export function getRoutes(): RouteProps[] {
    return [
        {
            page: Main,
            path: '/',
        },
        {
            page: Login,
            path: '/login'
        },
        {
            page: Register,
            path: '/register'
        }
    ]
}