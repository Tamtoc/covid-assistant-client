import React from 'react'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import changePasswordResolver from '../../validations/changePasswordResolver';

export const ChangePasswordModal = ({ isOpen, close }) => {

    const { register ,handleSubmit, formState: { errors }, reset } = useForm({ resolver: changePasswordResolver });

    const onSubmit = ( formData ) => {
        console.log( formData );
    }

    useEffect(() => {
        if ( !isOpen ) {
            reset()
        }
    }, [isOpen])

    return (
        <div>
            <Modal isOpen={isOpen}>
                <ModalHeader toggle={close}>
                    Change password
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <Label>New password</Label>
                            <FormGroup>
                                <Input placeholder="Your new password" {...register('password')} type="password"></Input>
                            </FormGroup>
                            { errors?.password && ( 
                                <FormText>
                                    <Alert color="danger">
                                        { errors.password.message }
                                    </Alert>
                                </FormText> 
                            )}
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={close}>Cancel</Button>
                    <Button color="primary" onClick={handleSubmit(onSubmit)}>Change my password</Button>
                </ModalFooter>
            </Modal>
        </div>
       
    )
}
