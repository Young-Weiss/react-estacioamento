import react, {Component} from 'react'
import './style.css'

export default class PatioEntrada extends Component {
    
    constructor(props)
    {
        super(props)

        this.state={
            placa: "",
            cor: "",
            marca:"",
            modelo: "",
            dataHoraEntrada: this.dateNow()      
        }
    }

    dateNow() 
    {
        let dataHoraAtual = new Date()
        let dataHoraTratada = dataHoraAtual.getDate() + "/" + 
                              parseInt(dataHoraAtual.getMonth() + 1) + "/" + 
                              dataHoraAtual.getFullYear() + " " + 
                              dataHoraAtual.getHours() + ":" +
                              dataHoraAtual.getMinutes() + ":" +
                              dataHoraAtual.getSeconds()

        return dataHoraTratada
    }

    insertCar(){
        let carroAAdicionar = this.state

        let carroEntradaObj = {
            placa: carroAAdicionar.placa,
            cor: carroAAdicionar.cor,
            marca:carroAAdicionar.marca,
            modelo: carroAAdicionar.modelo,
            dataHoraEntrada: this.dateNow(),
            dataHoraSaida: "",
            status: "true"
        }

        fetch('http://localhost:3001/carrosEstacionados', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(carroEntradaObj)
        }).then(this.setState({
            placa: "",
            cor: "",
            marca:"",
            modelo: "",
            dataHoraEntrada: "",
        })).then(alert('Entrada Efetuada!'))

        
    }

    

    changeState(event)
    {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render()
    {
        return(
            <div id="patioEntrada">
                <div>
                    <h4>Entrada de Veículos</h4>
                </div>

                <div className="row col-md-12">
                    <div className="row">
                        <dic className="col-md-4">
                            <span>Placa</span>
                            <input value={this.state.placa} onChange={(event)=>{this.changeState(event)}}type="text" name="placa" className="form-control"/>
                        </dic>
                        <dic className="col-md-4">
                            <span>Cor</span>
                            <input value={this.state.cor} onChange={(event)=>{this.changeState(event)}}type="text" name="cor" className="form-control"/>
                        </dic>
                        <dic className="col-md-4">
                            <span>Marca</span>
                            <input value={this.state.marca} onChange={(event)=>{this.changeState(event)}}type="text" name="marca" className="form-control"/>
                        </dic>
                    </div>

                    <div className="row">
                        <dic className="col-md-4">
                            <span>Modelo</span>
                            <input value={this.state.modelo} onChange={(event)=>{this.changeState(event)}}type="text" name="modelo" className="form-control"/>
                        </dic>
                        <dic className="col-md-4">
                            <span>Data/Hora Entrada</span>
                            <input value={this.state.dataHoraEntrada} readOnly={true} onChange={(event)=>{this.changeState(event)}}type="text" name="dataHoraEntrada" className="form-control"/>
                        </dic>
                        <dic className="col-md-4 mt-4">
                            <button className="btn btn-success" onClick={()=>{this.insertCar()}}>Entrada</button>
                        </dic>
                    </div>
                    
                </div>
            </div>
        )
    }
}