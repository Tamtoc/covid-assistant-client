import React, { useRef, useState, useEffect } from 'react'
import { Message } from '../ui/Message';
import './Signup.css';

import AuthService from '../../services/AuthService';

import { Button, Form, FormGroup, Label, Input }
    from 'reactstrap';

export const Signup = (props) => {

    const [user,setUser] = useState({first_name: "", last_name : "", email : "", password: "", confirmPassword: ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({first_name: "", last_name : "", email : "", password: "", confirmPassword: ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        if ( user.password !== user.confirmPassword ) {
            setMessage({error: true, errors: [ { msg: 'Password does not match' } ]});
        } else {
            const { confirmPassword, ...rest } = user; 
            console.log( 'rest', rest )
            AuthService.signup(rest).then(data=>{
                const { messages } = data;
                setMessage(messages);
                resetForm();
                if( !messages.error ){
                    timerID = setTimeout(()=>{
                        props.history.push('/login');
                    },2000)
                } 
            });
        }
    }

    return (
        <div>
            <Form className="signup-form" onSubmit={onSubmit}>
                <h2 className="logo auth text-center">
                    <a><img class="navbar-brand logo-auth" src="./logo6.png"></img></a>
                </h2>
                <h4 className="text-center" >Creat your account</h4>
                <div className="separator"></div>
                <FormGroup className="form-group">
                   <Label>First name</Label> 
                   <Input type="text" placeholder="First name" name="first_name" onChange={onChange}></Input>
                </FormGroup>
                <FormGroup className="form-group">
                   <Label>Last name</Label> 
                   <Input type="text" placeholder="Last name" name="last_name" onChange={onChange}></Input>
                </FormGroup>
                <FormGroup className="form-group">
                   <Label>Email</Label> 
                   <Input type="email" placeholder="Email" name="email" onChange={onChange}></Input>
                </FormGroup>
                <FormGroup className="form-group">
                   <Label>Password</Label> 
                   <Input type="password" placeholder="Password" name="password" onChange={onChange}></Input>
                </FormGroup>
                <FormGroup className="form-group">
                   <Label>Confirm password</Label> 
                   <Input type="password" placeholder="Password" name="confirmPassword" onChange={onChange}></Input>
                </FormGroup>
                <div className="d-grid mt-3">
                    <Button className="btn btn-success" type="submit">Sign up</Button>
                </div>
                <div className="separator"></div>
                {message ? <Message message={message}/> : null}
            </Form>
        </div>
    )
}