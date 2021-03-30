import { setError } from '../../../features/globalStates/slice';

interface Payload {
    payload: null | string;
};

export const clearError = () => async (dispatch: (action: Payload) => void) => dispatch(setError(null));