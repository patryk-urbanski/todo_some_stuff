import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { ITask } from '../../types';
import { RootState } from '../../redux/store';
import { clearError } from '../../redux/methods/generic';
import { getTasks, deleteTask, addEditTask } from '../../redux/methods/tasks';


import ErrorModal from '../../features/globalStates/ErrorModal';
import TaskTable from '../../components/tables/TaskTable';
import NewTaskInput from '../../features/tasks/NewTaskInput';
import EditionModal from '../../features/tasks/EditionModal';

interface IForm {
    task: string,
    id: string,
    is_completed: number,
};

const mapStateToProps = (state: RootState) => ({
    error: state.global.error,
    forceRefetch: state.refetchers.tasks,
    tasks: state.tasks.tasks,
    isLoading: state.global.isLoading,
});

const mapDispatch = {
    clearError,
    getTasks,
    deleteTask,
    addEditTask,
};

const connector = connect(mapStateToProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>

const Home = ({
    clearError,
    error,
    forceRefetch,
    tasks,
    getTasks,
    deleteTask,
    addEditTask,
    isLoading,
}: ReduxProps) => {
    const [ taskToEdit, setTaskToEdit ] = useState<null | ITask>(null);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    useEffect(() => {
        getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(forceRefetch) {
            getTasks();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceRefetch]);

    const handleStartTaskEdition = (task: ITask) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handleEditTask = async (form: IForm) => {
        const dataToSend = new FormData();
        const { task, id, is_completed } = form;
        dataToSend.append('id', id);
        dataToSend.append('task', task);
        dataToSend.append('is_completed', is_completed.toString())

        await addEditTask(id, dataToSend);
        setIsModalOpen(false);
    };

    const handleSwitchAction = (taskObject: ITask, isChecked: number | boolean) => {
        const dataToSend = new FormData();
        const { task, id } = taskObject;

        dataToSend.append('id', id);
        dataToSend.append('task', task);
        dataToSend.append('is_completed', isChecked.toString())

        addEditTask(id, dataToSend)
    }

    return (
        <div className='p-2'>
            <ErrorModal
                error={error}
                clearErrorHandler={clearError}
            />
            <NewTaskInput />
            <TaskTable
                isLoading={isLoading}
                tasks={tasks}
                deleteAction={deleteTask}
                editAction={handleStartTaskEdition}
                switchAction={handleSwitchAction}
            />
            {
                taskToEdit &&
                    <EditionModal
                        task={taskToEdit}
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                        onConfirm={handleEditTask}
                    />
            }
        </div>
    );
};

export default connector(Home);