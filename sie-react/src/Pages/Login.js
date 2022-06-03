import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {PersonaService} from "../service/PersonaService";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "primereact/button"

const Login = () => {
    const navigate = useNavigate();
    const [personas, setPersonas] = useState([]);
    const personaService = new PersonaService();
    const[user, setUser] = useState("");
    const[password, setPassword] = useState("");

    useEffect(() => {
        personaService.getAll().then(data => setPersonas(data));
    }, []);

    const handleClick = () => {
        let userInt = parseInt(user)
        for(let i=0; i < personas.length; i++){
            if(personas[i].id === userInt && personas[i].password === password){
                if(personas[i].type === "admin") {
                    navigate("/admin");
                    return;
                } else if (personas[i].type === "user") {
                    navigate("/user/"+user);
                    return;
                }
            }
        }
        alert("Data is incorrect")
    }

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card px-5 py-5" id="form1">
                        <div className="form-data" v-if="!submitted">
                            <div className="forms-inputs mb-4">
                                <label htmlFor="id">ID</label>
                                <span className="p-float-label" >
                                    <input style={{width:'100%'}} value={user} type="text" id="id" onChange={(e) => {setUser(e.target.value)}}/>
                                </span>
                            </div>
                            <div className="forms-inputs mb-4" style={{width:'100%'}}>
                                <label htmlFor="password">Password</label>
                                <span className="p-float-label">
                                    <input style={{width:'100%'}} value={password} type="password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                                </span>
                            </div>
                            <div className="mb-3">
                                <Button style={{width:'100%'}} label="Login" onClick={handleClick} type="button"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
