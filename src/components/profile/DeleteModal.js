import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert, Button } from 'reactstrap';
// import useAuth from '../../hooks/useAuth';

export const DeleteModal = ({ isOpen, close }) => {

    // const { logout } = useAuth();

    // const handleDelete = () => {
    //     // Petición http
    //     // close()
    //     logout();
    // }

    return (
        <div>
            <Modal isOpen={isOpen}>
                <ModalHeader toggle={close}>
                    Delete Account
                </ModalHeader>
                <ModalBody>
                    <Alert color="danger">
                        Do you want to delete your account?
                    </Alert>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={close}>Cancel</Button>
                    {/* <Button color="danger" onClick={handleDelete}>Delete my account</Button> */}
                </ModalFooter>
            </Modal>
        </div>
       
    )
}
