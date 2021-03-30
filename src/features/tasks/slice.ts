import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types';

type Projects = {
    tasks: ITask[] | [];
};

export const initialState: Projects = {
    tasks: []
};

const projects = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<ITask[]>) {

            state.tasks = action.payload;
        },
    },
});

export const {
    setTasks,
} = projects.actions;

export default projects.reducer;