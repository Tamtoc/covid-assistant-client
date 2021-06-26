import React, { useState, useEffect } from 'react'

import { Navbar } from '../ui/Navbar';

import './SensorData.css';

export const SensorData = () => {

    const [ dataState, setDataState ] = useState(null);

    useEffect(() => {
            fetch('http://ec2-18-191-133-208.us-east-2.compute.amazonaws.com:10004/sensor?from=0&limit=100', {
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
                const { data, total } = resp;
                console.log(data);
                setDataState( data )
                
            })
            
    }, [])

    console.log(dataState);

    if ( dataState ) {
        return (
            <div>
                <Navbar />
    
                <div className="container">
            
                    <table className="table-data">
    
                        <thead className="table-header">
                            <tr>
    
                                <th>Distance</th>
    
                                <th>Second</th>
    
                                <th>Date</th>
    
                            </tr>
                        </thead>
    
                        <tbody className="table-body">
                            { 
                                dataState.length  > 0 && dataState.map(({ dato, segundo, createdAt }, i) => 
                                <tr key={i}>
    
                                    <td>{dato}</td>
    
                                    <td>{segundo}</td>
    
                                    <td>{createdAt}</td>
    
                                </tr>)
                            }
    
                        </tbody>
    
                    </table>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Cargando...</h2>
            </div>
        )
    }
    
}
