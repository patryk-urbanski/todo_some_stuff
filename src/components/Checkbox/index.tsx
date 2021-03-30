import React from 'react';

import { Input, Label } from 'reactstrap';

interface Props {
    value: boolean | number,
    onSwitch: (id: number | string, isSelected: any) => void,
    id: string | number,
};

interface NumericConfig {
    [key: number]: boolean,
}

const Checkbox = ({
    value,
    onSwitch,
    id,
}: Props) => {
    const handleSwitch = (e: any) => {
        onSwitch(id, e.target.checked);
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
                onClick={handleSwitch}
                checked={preparedValue}
            />
        </Label>
    )
};

export default Checkbox;