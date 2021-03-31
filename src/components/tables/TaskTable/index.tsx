import React from 'react';

import { Table, Button, Spinner } from 'reactstrap';
import { ITask } from '../../../types';
import SwitchPillCell from '../../Checkbox';

interface Props {
    tasks: ITask[],
    switchAction: (task: ITask, isChecked: boolean | number) => void,
    deleteAction: (id: string) => void,
    editAction: (task: ITask) => void,
    isLoading: boolean,
}

const TaskTable = ({
    tasks,
    switchAction,
    deleteAction,
    editAction,
    isLoading,
}: Props) => {
    const handleSwitchIsCompleted = (task: ITask, isChecked: number) => {
        switchAction(task, isChecked ? 1 : 0)
    };

    const handleOnDelete = (id: string) => () => {
        deleteAction(id)
    };

    const handleOnEdit = (task: ITask) => () => {
        editAction(task)
    };

    if (isLoading) {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                <Spinner color='dark' size='lg' />
            </div>
        )
    };

    return tasks && tasks.length > 0 ? (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>DONE</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(task => (
                        <tr key={`${task.id}-${task.candidate}`}>
                            <th>{task.task}</th>
                            <th className='d-flex align-items-center'>
                                <SwitchPillCell
                                    task={task}
                                    value={task.is_completed}
                                    onSwitch={handleSwitchIsCompleted}
                                />
                            </th>
                            <th>
                                <Button color='success' onClick={handleOnEdit(task)}>
                                        <span>EDIT</span>
                                    </Button>
                                    <Button color='danger' onClick={handleOnDelete(task.id)}>
                                        <span>REMOVE</span>
                                </Button>
                            </th>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    ) : <p>It seems like you have nothing to do.</p>
};

export default TaskTable;