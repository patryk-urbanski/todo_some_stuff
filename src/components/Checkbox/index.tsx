import React from 'react';

import { Input, Label } from 'reactstrap';
import { ITask } from '../../types';

interface Props {
    value: boolean | number,
    onSwitch: (task: ITask, isSelected: any) => void,
    task: ITask,
};

interface NumericConfig {
    [key: number]: boolean,
}

const Checkbox = ({
    value,
    onSwitch,
    task,
}: Props) => {
    const handleSwitch = (e: any) => {
        onSwitch(task, e.target.checked);
    };

    const numericConfig: NumericConfig = {
        0: false,
        1: true,
    };

    const preparedValue = typeof value === 'boolean' ? value : numericConfig[value];

    return (
        <Label check>
            <Input
                type="checkbox"
                onChange={handleSwitch}
                checked={preparedValue}
            />
        </Label>
    )
};

export default Checkbox;