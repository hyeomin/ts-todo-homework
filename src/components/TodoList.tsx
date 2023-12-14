import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/config/configStore";
import { __fetchTodos } from "../redux/modules/todos";
import { TodoListProps } from "../types/TodosType";

function TodoList({ todos, isDone }: TodoListProps) {
    const dispatch: AppDispatch = useDispatch();

    const onUpdateStatusHandler = async (id: string, isDone: boolean) => {
        await axios.patch(
            `${process.env.REACT_APP_TODOS_SERVER_URL}/todos/${id}`,
            {
                isDone: !isDone,
            }
        );
        dispatch(__fetchTodos());
    };

    const onDeleteHandler = async (id: string) => {
        const confirmed = window.confirm("삭제하시겠습니까?");
        if (confirmed) {
            await axios.delete(
                `${process.env.REACT_APP_TODOS_SERVER_URL}/todos/${id}`
            );
            dispatch(__fetchTodos());
        } else return;
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
                                onClick={() =>
                                    onUpdateStatusHandler(todo.id, todo.isDone)
                                }
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
