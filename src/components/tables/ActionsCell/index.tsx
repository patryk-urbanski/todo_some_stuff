import React from 'react';

import { Button } from 'reactstrap';

interface Props {
    onEdit: () => void,
    onDelete: () => void,
}

const ActionsCell = ({
    onEdit,
    onDelete
}: Props) => {
    return (
        <td>
            <Button color='success'>
                <span>EDUTYJ</span>
            </Button>
            <Button color='danger'>
                <span>USUŃ</span>
            </Button>
        </td>
    )
};

export default ActionsCell;