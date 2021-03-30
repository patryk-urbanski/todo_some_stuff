import React, { useState, useEffect } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface Props {
    error: string | null,
    clearErrorHandler: () => void;
};

const ErrorModal = ({
    error,
    clearErrorHandler
}: Props) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const toggleModal = () => setIsOpen(!isOpen);

    useEffect(() => {
        setIsOpen(!!error)
    }, [error])

    return (
        <Modal isOpen={isOpen} toggle={toggleModal}>
            <ModalHeader>
                <span><strong>Oups!</strong> Somethig gone wrong... don't panic tho.</span>
            </ModalHeader>
            <ModalBody>
                {error}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={clearErrorHandler}
                >
                    <span>Got it!</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ErrorModal;

