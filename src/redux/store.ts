import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import globalReducer, { initialState as globalInitialState } from '../features/globalStates/slice';
import tasksReducer, { initialState as tasksInitialState } from '../features/tasks/slice';
import refetchersReducer, { initialState as refetchersInitialState } from '../features/refetchers/slice';

const initialState = {
    global: globalInitialState,
    tasks: tasksInitialState,
    refetchers: refetchersInitialState,
}

export const store = configureStore({
    reducer: {
        global: globalReducer,
        tasks: tasksReducer,
        refetchers: refetchersReducer,
    },
    preloadedState: initialState
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
