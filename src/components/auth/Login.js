import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form';

import './Login.css';

import { Button, Form, FormGroup, Label, Input }
    from 'reactstrap';

import { GoogleLoginButton } from 'react-social-login-buttons';
import { useLocation } from 'react-router';

import AuthService from '../../services/AuthService';
import { AuthContext } from '../../context/AuthContext';

export const Login = (props) => {

    const location = useLocation();
    const [user,setUser] = useState({email: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        console.log('info',user);
        AuthService.login(user).then(data=>{
            console.log(data);
            const { isAuthenticated,user} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/home');
            }
            else
                console.log('authenticate error!')
        });
    }

    return (
        <div>
            <Form className="login-form" onSubmit={onSubmit}>
                <h2 className="logo auth text-center">
                    <a><img class="navbar-brand logo-auth" src="./logo6.png"></img></a>
                </h2>
                <h4 className="text-center" >Welcome</h4>
                <div className="separator"></div>
                <FormGroup className="form-group">
                   <Label>Email</Label> 
                   <Input type="email" placeholder="Email" id="email" name="email" onChange={onChange} ></Input>
                </FormGroup>
                <FormGroup className="form-group">
                   <Label>Password</Label> 
                   <Input type="password" placeholder="Password" id="password" name="password" onChange={onChange} ></Input>
                </FormGroup>
                <div className="d-grid mt-3">
                    <Button className="btn btn-success" type="submit">Log in</Button>
                </div>
                <div className="text-center pt-3">
                    Don't have an account? <a className="internal-link link-success" href="/signup">Sign up</a>
                </div>
                <div className="separator"></div>
                {/* <GoogleLoginButton className="fs-6"/> */}
                <div className="fs-6 g-signin2 btn-google" data-onsuccess="onSignIn"></div>
            </Form>
        </div>
    )
}
