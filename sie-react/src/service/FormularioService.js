import axios from 'axios';

export class FormularioService{

    baseUrl = "http://localhost:8080/api/v1/form/"

    getAll(){
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    save(formulario, id_persona){
        return axios.post(this.baseUrl + "save/"+id_persona, formulario).then(res => res.data);
    }
}
