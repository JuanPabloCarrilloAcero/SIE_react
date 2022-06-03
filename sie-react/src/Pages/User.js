import React, {useState} from "react";
import '../App.css'
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {PersonaService} from "../service/PersonaService";
import {FormularioService} from "../service/FormularioService";
import 'bootstrap/dist/css/bootstrap.min.css';

const User = () => {
    const { register, handleSubmit} = useForm();
    new PersonaService();
    const formularioService = new FormularioService();
    const {id} = useParams();
    const parsed_id = parseInt(Object.values({id})[0]);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [type, setType] = useState('');
    const [comments, setComments] = useState('');

    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;


    const handleRegistration = (data) => {
        formularioService.save(data, parsed_id)
        alert("Gracias por su franqueza al manifestarnos sus quejas o sugerencias, seguiremos esforzándonos por mejorar cada día nuestros procesos internos")
        setName('');
        setPhone('');
        setMail('');
        setType('');
        setComments('');
    };

    const handleError = () => {alert("Not succesful")}; //removed errors

    const registerOptions = {
        name: { required: "Name is required" },
        phone: { required: "Phone is required"},
        mail: { required: "Email is required" },
        type: {required: "Type is required"},
        comments: {required: "Comment is required"},
        date:{}
    };

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card px-5 py-5" id="form1">
                    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                        <p hidden name="id_form" {...register('id_form')}></p>
                        <p hidden name="id_persona" {...register('id_persona')}></p>
                        <div className="forms-inputs mb-4">
                            <label>Nombre completo</label>
                            <span className="p-float-label" >
                                <input style={{width:'100%'}} type="text" name="name" value={name} {...register('name', registerOptions.name)} onChange={e => setName(e.target.value)}/>
                            </span>
                        </div>
                        <div className="forms-inputs mb-4">
                            <label>Teléfono o celular</label>
                            <span className="p-float-label" >
                                <input style={{width:'100%'}} type="text" name="phone" value={phone} {...register('phone', registerOptions.phone)} onChange={e => setPhone(e.target.value)}/>
                            </span>
                        </div>
                        <div className="forms-inputs mb-4">
                            <label>Correo Electrónico</label>
                            <span className="p-float-label" >
                                <input style={{width:'100%'}} type="text" name="mail" value={mail} {...register('mail', registerOptions.mail)} onChange={e => setMail(e.target.value)}/>
                            </span>
                        </div>
                        <div className="forms-inputs mb-4">
                            <label>Tipo de publicación</label>
                                <br/>
                                <label>
                                    <input type="radio" name="type" value={type} required {...register('type', registerOptions.type)} onChange={() => setType("queja")}/>
                                        queja
                                </label><br/>
                                <label>
                                    <input type="radio" name="type" value={type} required {...register('type', registerOptions.type)} onChange={() => setType("sugerencia")}/>
                                        sugerencia
                                </label><br/>
                        </div>
                        <div className="forms-inputs mb-4">
                            <label>Por favor escriba sus sugerencias y comentarios</label>
                            <span className="p-float-label" >
                                <textarea style={{width:'100%'}} name="comments" value={comments} {...register('comments', registerOptions.comments)} onChange={e => setComments(e.target.value)}/>
                            </span>
                        </div>
                        <button class="btn btn-primary" value={date} {...register('date', date)}>Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default User;
