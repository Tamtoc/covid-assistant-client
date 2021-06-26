import React, { useState, useEffect } from 'react'
import './Graphics.css';

import { Bar } from 'react-chartjs-2';

import { Navbar } from '../ui/Navbar';

export const Graphics = () => {

    const [ initialState, setInitialState ] = useState([])

    useEffect(() => {
            fetch('https://disease.sh/v3/covid-19/historical/Mexico?lastdays=30', {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).
            then( res => {
                if(res.ok) {
                    return res.json()
                }
            } ).
            then( resp => {
                const { timeline } = resp;
                const { cases, deaths, recovered } = timeline;
                setInitialState({ cases, deaths, recovered })
                
            })
            
    }, [])


    if ( !initialState.cases ) {
        return (
            <div>
                <h2>Cargando... </h2>
            </div>
        )
    } else {

        console.log('c', initialState);

        const dataCases = {
            labels: Object.keys(initialState.cases),
            datasets: [{
                label: 'Cases',
                type: 'line',
                backgroundColor: 'blue',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                hoverBorderColor: 'yellow',
                data: Object.values(initialState.cases)
            }]
        };

        const optionsCases = {
            maintainAspectRatio: false,
            responsive: true
        };

        const dataDeaths = {
            labels: Object.keys(initialState.deaths),
            datasets: [{
                label: 'Deaths',
                type: 'line',
                backgroundColor: 'blue',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                hoverBorderColor: 'yellow',
                data: Object.values(initialState.deaths)
            }]
        };
        
        const optionsDeaths = {
            maintainAspectRatio: false,
            responsive: true
        };
        
        const dataRecovered = {
            labels: Object.keys(initialState.recovered),
            datasets: [{
                label: 'Recovered',
                type: 'line',
                backgroundColor: 'blue',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                hoverBorderColor: 'yellow',
                data: Object.values(initialState.recovered)
            }]
        };
        
        const optionsRecovered = {
            maintainAspectRatio: false,
            responsive: true
        };

        return (
            <div>
    
                <Navbar />
    
                <div className="container">
                    
                    <div className="row">
                        <div className="col-md-6" style={{width:'100%', height: '500px'}}>
                            <h2>Cases</h2>
                            
                            <Bar data={dataCases} options={optionsCases}></Bar>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-6" style={{width:'100%', height: '500px'}}>
                            <h2>Deaths</h2>
                            
                            <Bar data={dataDeaths} options={optionsDeaths}></Bar>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-md-6" style={{width:'100%', height: '500px'}}>
                            <h2>Recovered</h2>
                            
                            <Bar data={dataRecovered} options={optionsRecovered}></Bar>
                        </div>
                    </div>
    
                    <div className="separator"></div>
                    <div className="font"><span className="font-title">Font: </span>https://corona.lmao.ninja/docs (COVID-19 data sourced from Johns Hopkins University, updated every 10 minutes)</div>
                </div>
    
            </div>
    
        )
    } 
    
}
