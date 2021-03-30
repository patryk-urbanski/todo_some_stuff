import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../redux/store';
import { clearError } from '../../redux/methods/generic';

import ErrorModal from '../../features/globalStates/ErrorModal';
import { getTasks } from '../../redux/methods/tasks';

const mapStateToProps = (state: RootState) => ({
    error: state.global.error,
    forceRefetch: state.refetchers.tasks,
});

const mapDispatch = {
    clearError,
};

const connector = connect(mapStateToProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>

const Home = ({
    clearError,
    error,
    forceRefetch,
}: ReduxProps) => {

    useEffect(() => {
        if(!forceRefetch) {
            getTasks();
        }
    }, [forceRefetch]);

    return (
        <div className='w-100 h-100'>
            <ErrorModal error={error} clearErrorHandler={clearError}/>

        </div>
    );
};

export default connector(Home);