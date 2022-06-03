import React from "react";
import './App.css';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Admin_users";
import User from "./Pages/User";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Login/>} />
                <Route path="/admin" element={<Profile/>} />
                <Route path="/user/:id" element={<User/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
