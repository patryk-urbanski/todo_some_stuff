import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { addEditTask } from '../../../redux/methods/tasks';

import { Form as FinalForm, Field } from 'react-final-form';
import { Label, Button, Form, Row} from 'reactstrap';

import styles from './index.module.css';

interface IForm {
    task: string,
};

const mapDispatch = {
    addEditTask,
};

const connector = connect(null, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>

const NewTaskInput = ({
    addEditTask
}: ReduxProps) => {

    const handleOnSubmit = (form: IForm) => {
        const dataToSend = new FormData();
        const { task } = form;
        dataToSend.append('id', '');
        dataToSend.append('task', task);
        dataToSend.append('is_completed', '0')

        addEditTask(null, dataToSend)
    };

    return (
        <div className='m-3'>
            <FinalForm
                onSubmit={handleOnSubmit}
                render={({ handleSubmit, form }) => {
                    return (
                        <Form
                            onSubmit={async (event) => {
                                await handleSubmit(event);
                                form.reset();
                            }}
                            className={styles.inputContainer}>
                            <Row className='m-0 p-0 d-flex flex-column'>
                                <Label className='my-1'>New task</Label>
                                <Field
                                    component={'input'}
                                    name='task'
                                    placeholder={'What you have to do?'}
                                />
                                <Button
                                    className='my-1'
                                    type='submit'
                                    color='primary'
                                >
                                    <span>Add new task!</span>
                                </Button>
                            </Row>
                        </Form>
                    )
                }}
            />
        </div>
    )
};

export default connector(NewTaskInput);
