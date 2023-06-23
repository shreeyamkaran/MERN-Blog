import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import {BrowserRouter} from "react-router-dom";
import {UserContextProvider} from "./UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserContextProvider>
);