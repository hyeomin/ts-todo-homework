import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos";

const store = configureStore({
    reducer: todos,
});

export default store;
