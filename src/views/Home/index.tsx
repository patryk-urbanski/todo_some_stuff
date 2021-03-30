import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../redux/store';
import { clearError } from '../../redux/methods/generic';

import ErrorModal from '../../features/globalStates/ErrorModal';
import { getTasks } from '../../redux/methods/tasks';
import TaskTable from '../../components/tables/TaskTable';
import NewTaskInput from '../../features/tasks/NewTaskInput';

const mapStateToProps = (state: RootState) => ({
    error: state.global.error,
    forceRefetch: state.refetchers.tasks,
    tasks: state.tasks.tasks,
});

const mapDispatch = {
    clearError,
    getTasks,
};

const connector = connect(mapStateToProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>

const Home = ({
    clearError,
    error,
    forceRefetch,
    tasks,
    getTasks,
}: ReduxProps) => {

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

    return (
        <div className='w-100 h-100'>
            <ErrorModal error={error} clearErrorHandler={clearError}/>
            <NewTaskInput />
            <TaskTable tasks={tasks} />
        </div>
    );
};

export default connector(Home);