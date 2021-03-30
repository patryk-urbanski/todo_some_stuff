import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRefetcherPayload {
    target: string;
    forceRefetch: boolean
}

interface IRefetchersInitialState {
    [key: string]: boolean,
};

export const initialState: IRefetchersInitialState = {
    tasks: false
};

const refetchers = createSlice({
    name: 'refetchers',
    initialState,
    reducers: {
        setForceRefetchByTarget(state, action: PayloadAction<IRefetcherPayload>) {
            const { target, forceRefetch } = action.payload;
            state[target] = forceRefetch;
        },
    },
});

export const { setForceRefetchByTarget } = refetchers.actions;

export default refetchers.reducer;
