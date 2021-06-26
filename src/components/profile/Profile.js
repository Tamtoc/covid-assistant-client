import React, { useEffect } from 'react'
import './Profile.css';

import { useContext } from 'react';
import { Navbar } from '../ui/Navbar';
import { DeleteModal } from './DeleteModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { useModal } from '../../services/useModal';
import { ProfilePictureModal } from './ProfilePictureModal';
import { AuthContext } from '../../context/AuthContext';

export const Profile = () => {

    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

    const [ isOpenDeleteModal, openDeleteModal, closeDeleteModal ] = useModal();
    const [ isOpenChangePasswordModal, openChangePasswordModal, closeChangePasswordModal ] = useModal();
    const [ isOpenProfilePictureModal, openProfilePictureModal, closeProfilePictureModal ] = useModal();

    useEffect(() => {
        fetch('http://ec2-18-191-133-208.us-east-2.compute.amazonaws.com:10004/upload/users/' + user.id)
        .then( res => res.blob())
        .then( img => {
            console.log(img)
            document.getElementById("image").setAttribute('src', URL.createObjectURL(img));
        })
    }, [])


    // if ( user.img ) {
        return (
            <div>
    
                <Navbar />
    
                <div className="container profile">
    
                    <div className="row">
                        <div className="col-md-6 profile-image" style={{width:'30%', height: '500px'}}>
                            <img id="image" className="image" onClick={openProfilePictureModal}></img>
                            <div className="separator"></div>
                        </div>
                        <div className="col-md-6 profile-data" style={{width:'70%', height: '500px'}}>
                            <h3 className="profile-title">About me</h3>
                            <div className="separator profile-data"></div>
    
                            <div className="info">
                                <div className="row data">
                                    <h5>First Name</h5>
                                    <p>{ user.firstName }</p>
                                </div>
                                <div className="row data">
                                    <h5>Last Name</h5>
                                    <p>{ user.lastName }</p>
                                </div>
                                <div className="row data">
                                    <h5>Email</h5>
                                    <p>{ user.email }</p>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="options-profile d-grid gap-2 d-md-flex justify-content-md-end">
    
                        <button type="button" className="btn btn-outline-warning me-2">Edit Profile</button>
                        <button type="button" className="btn btn-outline-info me-5" onClick={openChangePasswordModal}>Change password</button>
                        <button type="button" className="btn btn-outline-danger me-2" onClick={openDeleteModal}>Delete Account</button>
    
                    </div>
    
                </div>
    
                <DeleteModal isOpen={isOpenDeleteModal} close={closeDeleteModal}/>
                <ChangePasswordModal isOpen={isOpenChangePasswordModal} close={closeChangePasswordModal}/>
                <ProfilePictureModal isOpen={isOpenProfilePictureModal} close={closeProfilePictureModal}/>
                
            </div>
        )
    // } else {
    //     return (
    //         <div>
    //             <h2>Cargando perfil...</h2>
    //         </div>
    //     )
    //  }

    
}
