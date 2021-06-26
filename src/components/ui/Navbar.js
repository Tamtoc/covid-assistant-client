import React, { useContext } from 'react'

import AuthService from '../../services/AuthService';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

export const Navbar = () => {

    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    const onClickLogoutHandler = ()=>{
        AuthService.logout();
        setUser({email : "", firstName: "", lastName: "", role : ""});
        setIsAuthenticated(false);
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-success">
            <div class="container-fluid">
                {/* <a class="navbar-brand logo" href="#"><span className="fw-bold">Covid</span>-Assistant</a> */}
                <a><img class="navbar-brand logo" src="./logo7.png"></img></a>

                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/home">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                { user.firstName }
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                <li><a class="dropdown-item" href="#" onClick={onClickLogoutHandler}>Sign out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
