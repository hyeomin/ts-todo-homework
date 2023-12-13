import axios from "axios";
import { useDispatch } from "react-redux";
import { switchTodo } from "../redux/modules/todos";
import { TodoListProps } from "../types/TodosType";

function TodoList({ todos, setTodos, isDone }: TodoListProps) {
    const dispatch = useDispatch();

    const onUpdateStatusHandler = (id: string) => {
        // await axios.patch(`http://localhost:4000/todos/${id}`)
        dispatch(switchTodo(id));
    };

    const onDeleteHandler = async (id: string) => {
        await axios.delete(`http://localhost:4000/todos/${id}`);
        setTodos(todos.filter((item) => item.id !== id));
        // dispatch(deleteTodo(id));
    };

    return (
        <div className="list">
            <h2>{isDone ? "Done" : "In Progress"}</h2>
            {todos
                .filter((todo) => todo.isDone === isDone)
                .map((todo) => {
                    return (
                        <div className="single-card" key={todo.id}>
                            <h3>{todo.title}</h3>
                            <p>{todo.content}</p>
                            <button
                                onClick={() => onUpdateStatusHandler(todo.id)}
                            >
                                {todo.isDone ? "취소" : "완료"}
                            </button>
                            <button onClick={() => onDeleteHandler(todo.id)}>
                                삭제
                            </button>
                        </div>
                    );
                })}
        </div>
    );
}

export default TodoList;
