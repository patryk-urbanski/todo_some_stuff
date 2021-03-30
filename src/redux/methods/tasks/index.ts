import { api } from '../../../api';
import { setIsLoading, setError } from '../../../features/globalStates/slice';
import { setForceRefetchByTarget } from '../../../features/refetchers/slice';
import { setTasks } from '../../../features/tasks/slice';
import { ITask} from '../../../types';

type ForceRefetch = {
    target: string,
    forceRefetch: boolean,
}
type IsLoadingAndError = boolean | string | null

interface IPayload {
    payload: IsLoadingAndError | ITask[] | ForceRefetch
}

export const getTasks = () => async (dispatch: (action: IPayload) => void) => {
    dispatch(setIsLoading(true));

    const result = await api.getTasks();
    const { error, httpError, unhandledError, data } = result;

    const errorToHandle = error || httpError || unhandledError;

    if(result) {
        if(errorToHandle) {
            dispatch(setError(errorToHandle));
            dispatch(setIsLoading(false));
            dispatch(setForceRefetchByTarget({ target: 'tasks', forceRefetch: false }));
        }
        else {
            dispatch(setTasks(data));
            dispatch(setIsLoading(false));
            dispatch(setForceRefetchByTarget({ target: 'tasks', forceRefetch: false }));
        }
    }
    else {
        dispatch(setIsLoading(false));
        dispatch(setError('lack of response error'));
    }
}

export const addEditTask = (id: string | number | null, formData: FormData) => async (dispatch: (action: IPayload) => void) => {
    dispatch(setIsLoading(true));

    const result = await api.addEditTask(id, formData)
    const { error, httpError, unhandledError } = result;

    const errorToHandle = error || httpError || unhandledError;

    if(result) {
        if(errorToHandle) {
            dispatch(setError(errorToHandle));
            dispatch(setIsLoading(false));
            dispatch(setForceRefetchByTarget({ target: 'tasks', forceRefetch: true }));
        }
        else {
            dispatch(setIsLoading(false));
            dispatch(setForceRefetchByTarget({ target: 'tasks', forceRefetch: true }));
        }
    }
    else {
        dispatch(setIsLoading(false));
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
            dispatch(setForceRefetchByTarget({ target: 'tasks', forceRefetch: true }));
        }
        else {
            dispatch(setTasks(result));
            dispatch(setIsLoading(false));
            dispatch(setForceRefetchByTarget({ target: 'tasks', forceRefetch: true }));
        }
    }
    else {
        dispatch(setIsLoading(false));
        dispatch(setError('lack of response error'));
    }
}



