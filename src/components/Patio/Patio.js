import React, {Component} from 'react';

export default class Patio extends Component {
    
    constructor(props)
    {
        super(props)

        this.state = {
            carrosEstacionados : []
        }
    }

    componentDidMount() {
        this.loadApi()
    }

    loadApi() {
        fetch('http://localhost:3001/carrosEstacionados')
        .then(res => res.json())
        .then(res => this.setState({
            carrosEstacionados : res
        }))
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

    changeStatus(car)
    {
        let carrosState = this.state.carrosEstacionados

        console.log(car)

        let carroSaida = {
            placa: car.placa,
            cor: car.cor,
            marca: car.marca,
            modelo: car.modelo,
            dataHoraEntrada: car.dataHoraEntrada,
            dataHoraSaida: this.dateNow(),
            status: "false"
        }

        fetch("http://localhost:3001/carrosEstacionados/" + car.id,
        {
            method: "put",
            header: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(carroSaida)
        }).then(() => {
            for(let index in carrosState)
            {
                if(carrosState[index].id === car.id)
                {
                    carrosState[index].status ==="false" ? carrosState[index].status = "true" : carrosState[index].status = "false"

                    this.setState({
                        carrosEstacionados : carrosState
                    })
                }
            }
        })
    }

    renderCars() {

        let carrosEstacionados = this.state.carrosEstacionados

        return carrosEstacionados.map((index)=>{
            if(index.status === "true") {
                return (
                    <tr>
                        <td>{index.placa}</td>
                        <td>{index.modelo}</td>
                        <td>{index.marca}</td>
                        <td>{index.cor}</td>
                        <td>{index.dataHoraEntrada}</td>
                        <td><button className="btn btn-danger" onClick={()=>{this.changeStatus(index)}}>Saída</button></td>                    
                    </tr>
                )
            }
        })
                       
    }


    render() 
    {
        const myStyle = {
            
            backgroundColor: "white",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "25px",
            padding: "30px",
            borderRadius: "10px"
    };

        return(
            <div style={myStyle}>
                <div>
                    <h4>Carros Estacionados</h4>
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Placa</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Cor</th>
                            <th scope="col">Data/Hora Entrada</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCars()}
                    </tbody>
                </table>
            </div>
        )
    }

}