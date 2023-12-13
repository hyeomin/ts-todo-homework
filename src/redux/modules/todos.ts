import { createSlice } from "@reduxjs/toolkit";
import { RootState, Todo } from "../../types/TodosType";

const initialState: RootState = {
    todos: [
        {
            id: "test id",
            title: "test title",
            content: "test content",
            isDone: false,
        },
    ],
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
                (item: Todo) => item.id !== action.payload
            );
        },
        switchTodo: (state, action) => {
            const todo = state.todos.find((item) => item.id === action.payload);
            if (todo) todo.isDone = !todo.isDone;
        },
    },
});

export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
