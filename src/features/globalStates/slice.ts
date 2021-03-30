import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GlobalStates = {
    isLoading: boolean;
    error: string | null;
};

export const initialState: GlobalStates = {
    isLoading: false,
    error: null,
};

const globalStates = createSlice({
    name: 'globalStates',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {

            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {

            state.error = action.payload;
        },
    },
});

export const {
    setIsLoading, setError
} = globalStates.actions;

export default globalStates.reducer;