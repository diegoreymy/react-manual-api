import React, { Component } from 'react';

class Endpoints extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url : '.com-',
            respuesta : {},
            status: '-',
            spinnerHidden: true,
            outputRequestHidden: true,
            outputRequest: {},
        }
        this.getToken();
    }
    getToken = () => {
        fetch('https://diegoreymy.herokuapp.com/login',{
           method:'POST',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               email: 'admin@diegoreymy.com',
               password: '123'
           })
        })
       .then(res => res.json())
       .then(res => { localStorage.setItem('token',res.token) })
    }
    login = (e) => {
        this.setState({outputRequestHidden:false, spinnerHidden:false, outputRequest: {}})
        let error = e.target.getAttribute("error");
        let datos = {}
        if(error == 'true'){
            datos = {
                body : {
                    email: 'admin@diegoreymy.com',
                    password: ''
                }
            }
        }else{
            datos = {
                body : {
                    email: 'admin@diegoreymy.com',
                    password: '123'
                }
            }
        }      
        let endpoint = e.target.getAttribute("url");
        let metodo = e.target.getAttribute("data-http");
        fetch(`https://diegoreymy.herokuapp.com/${endpoint}`,{
           method: metodo,
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           },
           body: JSON.stringify(datos.body)
        })
        .then(res => res.json().then(data=> ({status:res.status, json:data, url: res.url})))
        .then(res => this.setState({
            respuesta: res.json, 
            status: res.status, 
            url: res.url, 
            spinnerHidden:true,
            outputRequest : datos 
        }))
    }
    getUser = (e) => {
        this.setState({outputRequestHidden:false, spinnerHidden:false, outputRequest: {}})
        let header = {
            headers:{
                token: localStorage.getItem('token')
            }
        }
        let endpoint = e.target.getAttribute("url");
        let metodo = e.target.getAttribute("data-http");
        fetch(`https://diegoreymy.herokuapp.com/${endpoint}`,{
            method: metodo,
            headers: header.headers
        })
        .then(res => res.json().then(data=> ({status:res.status, json:data, url: res.url})))
        .then(res => this.setState({
            respuesta: res.json, 
            status: res.status, 
            url: res.url, 
            spinnerHidden:true,
            outputRequest : header 
        }))
    }
    createUser = () => {
        this.setState({outputRequestHidden:false, spinnerHidden:false, outputRequest: {}})
        let datos = {
            body : {
                'first_name': 'Arthur',
                'last_name': 'Roberts',
                'email': 'arthur.roberts97@example.com',
                'password': '123',
                'avatar': 'https://randomuser.me/api/portraits/men/28.jpg'
            }
        }
        let header = {
            headers:{
                'token': localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(`https://diegoreymy.herokuapp.com/usuario`,{
            method: 'POST',
            headers: header.headers,
            body: JSON.stringify(datos.body)
        })
        .then(res => res.json().then(data=> ({status:res.status, json:data, url: res.url})))
        .then(res => {
            this.setState({
                respuesta: res.json, 
                status: res.status, 
                url: res.url, 
                spinnerHidden:true,
                outputRequest : Object.assign(header, datos)
            })
            return res.json;
        }).then(res => {
            fetch(`https://diegoreymy.herokuapp.com/usuario/${res.usuario._id}?mantener=false`,{
                method: 'DELETE',
                headers: {'token': localStorage.getItem('token')}
            })
        })
    }
    deleteUser = () => {
        this.setState({outputRequestHidden:false, spinnerHidden:false, outputRequest: {}})
        fetch(`https://diegoreymy.herokuapp.com/usuario`,{
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'first_name': 'Arthur',
                'last_name': 'Roberts',
                'email': 'arthur.roberts97@example.com',
                'password': '123',
                'avatar': 'https://randomuser.me/api/portraits/men/28.jpg'
            })
        })
        .then(res => res.json())
        .then(res => {
            let header = {
                headers:{
                    'token': localStorage.getItem('token'),
                }
            }
            fetch(`https://diegoreymy.herokuapp.com/usuario/${res.usuario._id}?mantener=false`,{
                method: 'DELETE',
                headers: header.headers
            })
            .then(res => res.json().then(data=> ({status:res.status, json:data, url: res.url})))
            .then(res => {
                this.setState({
                    respuesta: res.json, 
                    status: res.status, 
                    url: res.url, 
                    spinnerHidden:true,
                    outputRequest : header
                })
            })
        })
    }
    disableUser = () => {
        this.setState({outputRequestHidden:false, spinnerHidden:false, outputRequest: {}})
        fetch(`https://diegoreymy.herokuapp.com/usuario`,{
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'first_name': 'Arthur',
                'last_name': 'Roberts',
                'email': 'arthur.roberts97@example.com',
                'password': '123',
                'avatar': 'https://randomuser.me/api/portraits/men/28.jpg'
            })
        })
        .then(res => res.json())
        .then(res => {
            let header = {
                headers:{
                    'token': localStorage.getItem('token'),
                }
            }
            fetch(`https://diegoreymy.herokuapp.com/usuario/${res.usuario._id}`,{
                method: 'DELETE',
                headers: header.headers
            })
            .then(res => res.json().then(data=> ({status:res.status, json:data, url: res.url})))
            .then(res => {
                this.setState({
                    respuesta: res.json, 
                    status: res.status, 
                    url: res.url, 
                    spinnerHidden:true,
                    outputRequest : header
                })
                return res;
            })
            .then(res => {
                fetch(`https://diegoreymy.herokuapp.com/usuario/${res.json.usuario._id}?mantener=false`,{
                    method: 'DELETE',
                    headers: {'token': localStorage.getItem('token')}
                })
            })
        })
    }
    updateUser = () => {
        this.setState({outputRequestHidden:false, spinnerHidden:false, outputRequest: {}})
        fetch(`https://diegoreymy.herokuapp.com/usuario`,{
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'first_name': 'Arthur',
                'last_name': 'Roberts',
                'email': 'arthur.roberts97@example.com',
                'password': '123',
                'avatar': 'https://randomuser.me/api/portraits/men/28.jpg'
            })
        })
        .then(res => res.json())
        .then(res => {
            let datos = {
                body : {
                    'first_name': 'Corey',
                }
            }
            let header = {
                headers:{
                    'token': localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch(`https://diegoreymy.herokuapp.com/usuario/${res.usuario._id}`,{
                method: 'PUT',
                headers: header.headers,
                body: JSON.stringify(datos.body)
            })
            .then(res => res.json().then(data=> ({status:res.status, json:data, url: res.url})))
            .then(res => {
                this.setState({
                    respuesta: res.json, 
                    status: res.status, 
                    url: res.url, 
                    spinnerHidden:true,
                    outputRequest : Object.assign(header, datos)
                })
                return res;
            })
            .then(res => {
                fetch(`https://diegoreymy.herokuapp.com/usuario/${res.json.usuario._id}?mantener=false`,{
                    method: 'DELETE',
                    headers: {'token': localStorage.getItem('token')}
                })
            })
        })
    }
    render(){
        return(
            <div>
                <section className="console" id="console">
                    <div className="endpoints" data-key="endpoints">
                        <ul>
                            <li onClick={this.getUser} data-http="get" url="usuario">Listar Usuarios</li>
                            <li onClick={this.getUser} data-http="get" url="usuario?desde=1&cantidad=10">Listar Usuarios del 1 al 10</li>
                            <li onClick={this.getUser} data-http="get" url="usuario?estado=false">Listar Usuarios inactivos</li>
                            <li onClick={this.login} data-http="post" url="login">Login</li>
                            <li onClick={this.login} data-http="post" url="login" error="true">Error Login</li>
                            <li onClick={this.createUser} data-http="post">Crear Usuarios</li>
                            <li onClick={this.updateUser} data-http="put">Actualizar Usuarios</li>
                            <li onClick={this.disableUser} data-http="delete">Desactivar Usuarios</li>
                            <li onClick={this.deleteUser} data-http="delete">Borrar Usuarios</li>
                        </ul>
                    </div>
                    <div className="output">
                        <div className="request">
                            <p className="request-title"><strong>Request <i className="fa fa-arrow-circle-up" /> <span className="url" data-key="url">{(this.state.url).split('.com')[1]}</span></strong></p>
                            <pre data-key="output-request" hidden={this.state.outputRequestHidden}>{JSON.stringify(this.state.outputRequest, undefined, 3)}</pre>
                        </div>
                        <div className="response">
                            <p className="response-title"><strong>Response <i className="fa fa-arrow-circle-down" /> <span className="response-code bad" data-key="response-code">{this.state.status}</span></strong></p>
                            <div data-key="spinner" className="spinner" hidden={this.state.spinnerHidden}>
                            <div className="cube1" />
                            <div className="cube2" />
                            </div>
                            <pre data-key="output-response" hidden={!(this.state.spinnerHidden)}>{JSON.stringify(this.state.respuesta, undefined, 3)}</pre>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Endpoints;
