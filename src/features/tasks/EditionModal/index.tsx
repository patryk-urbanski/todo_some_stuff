import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, Form, Row, Label } from 'reactstrap';
import { Form as FinalForm, Field } from 'react-final-form';
import { ITask } from '../../../types';

interface Props {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    onConfirm: (form: ITask) => void,
    task: ITask,
}

const EditionModal = ({
    isOpen,
    setIsOpen,
    onConfirm,
    task,
}: Props) => {
    const toggleModal = () => setIsOpen(!isOpen);
    return (
        <Modal isOpen={isOpen} toggle={toggleModal}>
            <ModalHeader>
                <span><strong>Task edition</strong></span>
            </ModalHeader>
            <ModalBody>
                <FinalForm
                    initialValues={task}
                    onSubmit={onConfirm}
                    render={({ handleSubmit }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Row className='m-0 p-0 d-flex flex-column'>
                                    <Label className='my-1'>Task</Label>
                                    <Field
                                        component={'input'}
                                        name='task'
                                    />
                                </Row>
                                <Button
                                    className='my-2 float-right'
                                    type='submit'
                                    color='primary'
                                >
                                    <span>SAVE</span>
                                </Button>
                            </Form>
                        )
                    }}
                />
            </ModalBody>
        </Modal>
    )
};

export default EditionModal;