import React, { useState, useContext } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button, Input, FormGroup, Label } from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
// import useAuth from '../../hooks/useAuth';

export const ProfilePictureModal = ({ isOpen, close }, ...props) => {

    const {user} = useContext(AuthContext);

    const [fileName, setFileName] = useState("Upload image");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const [file] = e.target.files;
        const isValidSize = file?.size < 5000 * 1024;
        const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
        const isValidType = isNameOfOneImageRegEx.test(file.name);

        if ( !isValidSize ) return alert('Invalid Image');
        if ( !isValidType ) return alert('Only images');

        setFileName(file.name);

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        }

        reader.readAsDataURL(file);
    }

    const handleUpdateFile = () => {
        if ( !selectedFile ) return alert('Image required');
        let file = dataURLtoFile(selectedFile, fileName);

        var formData = new FormData();
        formData.append("file", file);

        fetch('http://ec2-18-191-133-208.us-east-2.compute.amazonaws.com:10004/upload/users/' + user.id, {
            method: 'put',
            body: formData
        })
        .then( res => res.json() )
        close();
        setTimeout(() => {
            document.location.reload();
        }, 1500);
    }

    function dataURLtoFile(dataurl, filename) {
 
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    return (
        <div>
            <Modal isOpen={isOpen}>
                <ModalHeader toggle={close}>
                    Profile Picture
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Pick your new profile picture</Label> 
                            <Input type="file" label={fileName} onChange={handleFileChange} accept=".jpg, .jpeg, .gif, .png"/>
                        </FormGroup>
                    </Form>
                    <h5>Preview</h5>
                    <img className="img-fluid mt-3" src={selectedFile} alt ="profile-img-preview">
                    
                    </img>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={close}>Cancel</Button>
                    <Button color="primary" onClick={handleUpdateFile}>Update image</Button>
                </ModalFooter>
            </Modal>
        </div>
       
    )
}
