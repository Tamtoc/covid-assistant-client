import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import { Navbar } from './components/ui/Navbar';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Home } from './components/home/Home';
import { Graphics } from './components/graphics/Graphics';
import { Profile } from './components/profile/Profile';
import { ChatContent } from './components/chatContent/ChatContent';
import { SensorData } from './components/sensorData/SensorData';

import PrivateRoute from './hocs/PrivateRoute';
import PublicRoute from './hocs/PublicRoute';


function App() {
    return (
      <Router>
        <PublicRoute path="/login" component={Login}/>
        <PublicRoute path="/signup" component={Signup}/>
        <PrivateRoute path="/home" component={Home}/>
        <PrivateRoute path="/profile" component={Profile}/>
        <PrivateRoute path="/graphics" component={Graphics}/>
        <PrivateRoute path="/sensor_data" component={SensorData}/>
        <PrivateRoute path="/assistant" component={ChatContent}/>
        <PrivateRoute path="/admin" component={Profile}/>
      </Router>
    );
}

export default App;