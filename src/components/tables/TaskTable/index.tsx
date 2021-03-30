import React from 'react';

import { Table } from 'reactstrap';
import { ITask } from '../../../types';
import SwitchPillCell from '../../Checkbox';
import ActionsCell from '../ActionsCell';

interface Props {
    tasks: ITask[]
}

const TaskTable = ({
    tasks
}: Props) => {
    const handleSwitchIsCompleted = (id: string | number, isChecked: number) => {
        console.log(id, isChecked)
    };

    return tasks && tasks.length > 0 ? (
        <Table>
            <thead>
                <tr>
                    <th>Zadanie</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(task => (
                        <tr key={`${task.id}-${task.candidate}`}>
                            <th>{task.task}</th>
                            <th>
                                <SwitchPillCell
                                    id={task.id}
                                    value={task.is_completed}
                                    onSwitch={handleSwitchIsCompleted}
                                />
                            </th>
                            <th>
                                
                            </th>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    ) : <p>It seems like you have nothing to do.</p>
};

export default TaskTable;