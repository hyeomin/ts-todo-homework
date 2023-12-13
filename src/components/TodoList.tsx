import { useDispatch } from "react-redux";
import { deleteTodo, switchTodo } from "../redux/modules/todos";
import { TodoListProps } from "../types/TodosType";

function TodoList({ todos, isDone }: TodoListProps) {
    const dispatch = useDispatch();

    const onUpdateStatusHandler = (id: string) => {
        dispatch(switchTodo(id));
    };

    const onDeleteHandler = (id: string) => {
        dispatch(deleteTodo(id));
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
