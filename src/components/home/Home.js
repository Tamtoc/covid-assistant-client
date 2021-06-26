import React from 'react'
import './Home.css';

import { Navbar } from '../ui/Navbar';

export const Home = () => {
    return (
        <div>
            <Navbar />
            
            <div className="container-home">
                <div className="card">
                    <a className="internal-link home" href="/sensor_data">
                        Information from my Sensor
                        <div className="separator"></div>
                    </a>
                </div>

                <div className="card">
                <a className="internal-link home" href="/assistant">
                        Assistant
                        <div className="separator"></div>
                    </a>
                </div>

                <div className="card">
                    <a className="internal-link home" href="/graphics">
                        Graphics
                        <div className="separator"></div>
                    </a>
                </div>
            </div>
        </div>
    )
}
