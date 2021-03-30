import { api } from '../../../api';
import { setIsLoading, setError } from '../../../features/globalStates/slice';
import { setForceRefetchByTarget } from '../../../features/refetchers/slice';
import { setTasks } from '../../../features/tasks/slice';
import { ITask} from '../../../types';

type IsLoadingAndError = boolean | string | null

interface IPayload {
    payload: IsLoadingAndError | ITask[]
}

export const getTasks = () => async (dispatch: (action: IPayload) => void) => {
    dispatch(setIsLoading(true));

    const result = await api.getTasks()
    const { error, httpError, unhandledError } = result;

    const errorToHandle = error || httpError || unhandledError;

    if(result) {
        setForceRefetchByTarget({ target: 'task', forceRefetch: false });
    }

    if(errorToHandle) {
        dispatch(setError(errorToHandle));
        dispatch(setIsLoading(false));
    }
    else {
        dispatch(setTasks(result));
        dispatch(setIsLoading(false));
    }
}

export const addEditTask = () => async (dispatch: (action: IPayload) => void) => {
    dispatch(setIsLoading(true));

    const result = await api.getTasks()
    const { error, httpError, unhandledError } = result;

    const errorToHandle = error || httpError || unhandledError;

    if(result) {
        if(errorToHandle) {
            dispatch(setError(errorToHandle));
            dispatch(setIsLoading(false));
            setForceRefetchByTarget({ target: 'task', forceRefetch: true });
        }
        else {
            dispatch(setTasks(result));
            dispatch(setIsLoading(false));
            setForceRefetchByTarget({ target: 'task', forceRefetch: true });
        }
    }
    else {
        dispatch(setError('lack of response error'));
    }
}

export const deleteTask = (id: string | number) => async (dispatch: (action: IPayload) => void) => {
    dispatch(setIsLoading(true));

    const result = await api.deleteTask(id)
    const { error, httpError, unhandledError } = result;

    const errorToHandle = error || httpError || unhandledError;

    if(result) {
        if(errorToHandle) {
            dispatch(setError(errorToHandle));
            dispatch(setIsLoading(false));
            setForceRefetchByTarget({ target: 'task', forceRefetch: true });
        }
        else {
            dispatch(setTasks(result));
            dispatch(setIsLoading(false));
            setForceRefetchByTarget({ target: 'task', forceRefetch: true });
        }
    }
    else {
        dispatch(setError('lack of response error'));
    }
}



