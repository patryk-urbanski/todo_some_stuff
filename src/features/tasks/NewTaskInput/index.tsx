import React, { FormEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';


import { Form as FinalForm } from 'react-final-form';
import { Label, Input, Button, Form, Row} from 'reactstrap';

const mapDispatch = {

};

const connector = connect(null, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>

const NewTaskInput = ({
}: ReduxProps) => {
    const [ newTask, setNewTask ] = useState<string>('');

    const handleOnSubmit = async (form: FormEvent<HTMLFormElement>) => {
        
        console.log(form)
    };

    return (
        <div className='m-3'>
            <FinalForm 
                onSubmit={handleOnSubmit}
                render={({ handleSubmit, values }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Row className='m-0 p-0'>
                                <Label className='my-1'>New task</Label>
                                <Input
                                    className='my-1'
                                    name='newTask'
                                    placeholder={'For random project leave empty'}
                                    value={newTask}
                                    onChange={e => setNewTask(e.target.value)}
                                />
                                <Button
                                    className='my-1'
                                    type='submit'
                                    color='primary'
                                >
                                    <span>Get some rectangles!</span>
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
