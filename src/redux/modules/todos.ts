import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../types/TodosType";

export const __fetchTodos = createAsyncThunk(
    "fetchTodos",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/todos`
            );
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }
);

const initialState: RootState = {
    todos: [],
    isLoading: false,
    isError: false,
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(
                (item) => item.id !== action.payload
            );
        },
        switchTodo: (state, action) => {
            const todo = state.todos.find((item) => item.id === action.payload);
            if (todo) todo.isDone = !todo.isDone;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(__fetchTodos.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(__fetchTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.todos = action.payload;
            })
            .addCase(__fetchTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
