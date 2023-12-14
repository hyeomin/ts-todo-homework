import axios from "axios";
import { Todo } from "../types/TodosType";

const fetchTodos = async () => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/todos`
        );
        return data;
    } catch (error) {
        console.log("Error:", error);
    }
};

const addTodo = async (newTodo: Omit<Todo, "id">) => {
    try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
    } catch (error) {
        console.log("Error:", error);
    }
};

const deleteTodo = async (id: string) => {
    try {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`);
        fetchTodos();
    } catch (error) {
        console.log("Error:", error);
    }
};

const switchTodo = async (id: string, isDone: boolean) => {
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`, {
        isDone: !isDone,
    });
};

export { addTodo, deleteTodo, fetchTodos, switchTodo };
