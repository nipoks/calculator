import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.tsx'
import {AuthContextProvider} from "./context/authContext/authContext.ts";
import {AuthInterceptor} from "./common/AuthInterceptor.tsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <AuthInterceptor>
                    <App />
                </AuthInterceptor>
            </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>,
)
