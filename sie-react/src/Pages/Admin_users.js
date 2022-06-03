import React, {Component} from "react";
import '../App.css'
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from "primereact/button";
import {PersonaService} from "../service/PersonaService";
import {FormularioService} from "../service/FormularioService"
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Panel} from "primereact/panel";
import {Menubar} from "primereact/menubar";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import { Messages } from "primereact/messages";

export default class Admin_users extends Component{

    messages;

    constructor() {
        super();
        this.state = {visible:false,
            visible2:false,
            persona:{
                id:null,
                name: null,
                password: null,
                type: null
            },
            formulario:{
                id:null,
                name:null,
                mail:null,
                type:null,
                comments:null
            },
            selectedpersona: {
            },
            selectedformulario:{
            }
        };
        this.itemsPersonaTable = [
            {
                label: 'New user',
                icon: 'pi pi-fw pi-plus',
                command: () =>{this.showSaveDialog()}
            },
            {
                label: 'Edit user',
                icon: 'pi pi-fw pi-pencil',
                command: () =>{this.showEditDialog()}
            },
            {
                label: 'Delete user',
                icon: 'pi pi-fw pi-trash',
                command: () =>{this.delete()}
            }
        ];
        this.itemsFormTable = [
            {
                label: 'See More',
                icon: 'pi pi-fw pi-search',
                command: () =>{this.showFormDialog()}
            }
        ];
        this.personaService = new PersonaService();
        this.formService = new FormularioService();
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.showDelete = this.showDelete.bind(this);
        this.footer = (
            <div>
                <Button label="Save" icon="pi pi-check" onClick={this.save} />
            </div>
        )
    }

    componentDidMount() {
        this.personaService.getAll().then(data => this.setState({personas:data}));
        this.formService.getAll().then(data => this.setState({formularios:data}));
    }

    save() {
        if (this.personaNotNull) {
            this.personaService.save(this.state.persona).then(() => {
                this.showSuccess()
                this.hideDialog()
                this.updatePersonaTable()

            });
        } else {
            this.showError()
            this.hideDialog()
            this.updatePersonaTable()

        }
    }

    delete(){
        if(window.confirm("Are you sure you want to delete the user?")){
            this.personaService.delete(this.state.selectedpersona.id).then(() =>{ //data deleted
                this.showDelete()
                this.updatePersonaTable()
            })
        }
    }

    render(){
        return(
            <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
                <Menubar model={this.itemsFormTable}/>
                <Panel header="COMMENTS" >
                    <DataTable value={this.state.formularios} selectionMode="single" selection={this.state.selectedformulario} onSelectionChange={e => this.setState({selectedformulario: e.value})}>
                        <Column sortable field="date" header="Date"></Column>
                        <Column sortable field="name" header="Name"></Column>
                        <Column sortable field="type" header="Type"></Column>
                    </DataTable>
                </Panel>
                <br/><br/>
                <Messages ref={e => (this.messages = e)} />
                <Menubar model={this.itemsPersonaTable}/>
                <Panel header="USUARIOS" >
                    <DataTable value={this.state.personas} selectionMode="single" selection={this.state.selectedpersona} onSelectionChange={e => this.setState({selectedpersona: e.value})}>
                        <Column sortable field="id" header="ID"></Column>
                        <Column sortable field="name" header="Name"></Column>
                        <Column sortable field="type" header="Type"></Column>
                    </DataTable>
                </Panel>
                <Dialog header="New Person" visible={this.state.visible} style={{width:'60%'}} footer={this.footer} modal={true} onHide={() => this.setState({visible:false})}>
                    <br/>
                    <span className="p-float-label">
                        <InputText value={this.state.persona.name} style={{width:'100%'}} id="name" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let persona = Object.assign({}, prevState.persona);
                                persona.name = val;
                                return {persona};
                        })}}/>
                        <label htmlFor="name">Name</label>
                    </span>
                    <br/>
                    <span className="p-float-label">
                        <InputText value={this.state.persona.password} style={{width:'100%'}} id="password" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let persona = Object.assign({}, prevState.persona);
                                persona.password = val;
                                return {persona};
                        })}}/>
                        <label htmlFor="password">Password</label>
                    </span>
                    <br/>
                    <span className="p-float-label">
                        <select defaultValue={'default'} value={this.state.persona.type} style={{width:'100%'}} id="type" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let persona = Object.assign({}, prevState.persona);
                                persona.type = val;
                                return {persona};
                        })}}>
                            <option value="default" selected disabled hidden>Type</option>
                            <option value="user">Egresado</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </span>
                </Dialog>
                <Dialog header="See more" visible={this.state.visible2} style={{width:'60%'}} modal={true} onHide={() => this.setState({visible2:false})}>
                    <label htmlFor="name">Name</label>
                    <h2 style={{width:'100%'}} id="name">{this.state.selectedformulario.name}</h2>

                    <br/>
                    <label htmlFor="mail">Mail</label>
                    <h2 style={{width:'100%'}} id="mail">{this.state.selectedformulario.mail}</h2>

                    <br/>
                    <label htmlFor="type">Type</label>
                    <h2 style={{width:'100%'}} id="type">{this.state.selectedformulario.type}</h2>

                    <br/>
                    <label htmlFor="comment">Comment</label>
                    <h2 style={{width:'100%'}} id="comments">{this.state.selectedformulario.comments} </h2>
                </Dialog>
            </div>
        )
    }

    hideDialog(){
        this.setState({
            visible:false,
            persona:{
                id:null,
                name: null,
                password: null,
                type: null
            }
        });
    }

    updatePersonaTable(){
        this.personaService.getAll().then(data => this.setState({personas: data}));
    }

    personaNotNull(){
        return this.state.persona.name != null && this.state.persona.password != null && this.state.persona.type != null
            && this.state.persona.name !== "" && this.state.persona.password !== "" && this.state.persona.type !== "";
    }

    showSuccess() {
        this.messages.show({
            severity: 'success',
            detail: 'User saved succesfully'
        });
    }

    showError() {
        this.messages.show({
            severity: 'error',
            detail: "Error, action was not completed"
        });
    }

    showDelete() {
        this.messages.show({
            severity: 'info',
            detail: "User deleted succesfully"
        });
    }

    showSaveDialog(){
        this.setState({
            visible:true,
            persona:{
                id:null,
                name: null,
                password: null,
                type: null
            }
        });
    }

    showEditDialog(){
        this.setState({
            visible:true,
            persona:{
                id:this.state.selectedpersona.id,
                name: this.state.selectedpersona.name,
                password: this.state.selectedpersona.password,
                type: this.state.selectedpersona.type
            }
        });
    }

    showFormDialog(){
        this.setState({
            visible2:true,
            formulario:{
                id:this.state.selectedformulario.id,
                name:this.state.selectedformulario.name,
                mail: this.state.selectedformulario.mail,
                type: this.state.selectedformulario.type,
                comments: this.state.selectedformulario.comments
            }
        });
    }
}
