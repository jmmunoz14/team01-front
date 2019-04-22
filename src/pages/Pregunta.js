import React, { Component } from 'react'
import { origen } from '../helper/config.js'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl';

class Pregunta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preguntaas:
                [
                    {
                        id: '',
                        materia: '',
                        respuesta: '',
                        idioma: ''
                    }

                ],
            currentQuestion: 0,
            respuestasCorrectas: 0

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        if (window.navigator.language === "en") {
            fetch(origen + '/api/allquestionen')
                .then((response) => {
                    return response.json()
                })
                .then((json) => {

                    return json;
                })
                .then((json) => {
                    this.setState({ preguntaas: json });



                });
        }
        else {
            fetch(origen + '/api/allquestiones')
                .then((response) => {
                    return response.json()
                })
                .then((json) => {

                    return json;
                })
                .then((json) => {
                    this.setState({ preguntaas: json });



                });
        }

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    add(i) {
        return i + 1;
    }

    handleSubmit(event) {
        if (this.state.value === this.state.preguntaas[this.state.currentQuestion].respuesta) {
            this.setState((respuestasCorrectas) => ({ respuestasCorrectas: this.state.respuestasCorrectas + 1 }),
                () => {
                    if (window.navigator.language === "es") {
                        alert("Respuesta Correcta! \n numero de respuestas correctas: " + this.state.respuestasCorrectas);
                    }
                    else {
                        alert("Correct Answer! \n score: " + this.state.respuestasCorrectas);
                    }
                })
            if (this.state.currentQuestion < this.state.preguntaas.length - 1) {
                this.setState({ currentQuestion: this.state.currentQuestion + 1, value: '' })
            }
            else {
                if (window.navigator.language === "es") {
                    alert('Fin de las preguntas, volviendo a empezar')
                }
                else {
                    alert('End of questions, restarting')
                }

                this.setState({ currentQuestion: this.state.currentQuestion - this.state.currentQuestion, value: '' })
                this.setState({ respuestasCorrectas: this.state.respuestasCorrectas - this.state.respuestasCorrectas, value: '' })
            }


        }
        else {
            if (window.navigator.language === "es") {
                alert('respuesta incorrecta')
            }
            else {
                alert('wrong question')
            }
        }
        event.preventDefault();
    }

    render() {
        if (localStorage.getItem("login") === "false") {
            return (

                <div className='todo'>
                    <div className='quiz'>
                        Quíz
                                </div>
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title"><FormattedMessage id="NoSesion" /></h1>
                        </div>
                    </div>
                </div>
            )
        }
        else {


            return (

                <div className='todo'>
                    <div className='quiz'>
                        Quíz
                </div>

                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title"><FormattedMessage id="Pregunta:" /></h1>

                            <div className='preguntaText'>
                                <p className="card-text">{this.state.preguntaas[this.state.currentQuestion].enunciado}</p>

                            </div>

                            <form onSubmit={this.handleSubmit}>

                                <label ><p className='respuestatext' id="res"><FormattedMessage id="Respuesta:" /></p>
                                    <FormattedMessage id="ingrese" defaultMessage="Ingrese su respuesta">

                                        {placeholder => <Input type="text" id="respuesta" value={this.state.value} onChange={this.handleChange}
                                            placeholder={placeholder} />}

                                    </FormattedMessage>

                                </label>
                                <Button className='boton'><FormattedMessage id="Enviar" /></Button>
                            </form>
                        </div>
                    </div>

                </div>


            )
        }
    }
}

export default Pregunta;