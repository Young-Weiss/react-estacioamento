import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import Patio from '../Patio/Patio'
import PatioEntrada from '../PatioEntrada/PatioEntrada'

export default () => {
    return(
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Estacionamento React</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" aria-current="page" to="/entrada">Entrada</Link>
                        <Link className="nav-link" to="/">Saída</Link>                        
                    </div>
                    </div>
                </div>
            </nav>


            <Route exact="/" path="/" component={Patio} />
            <Route exact="/" path="/entrada" component={PatioEntrada} />
        </Router>
    )
}