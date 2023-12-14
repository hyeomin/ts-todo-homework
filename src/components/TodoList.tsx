import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, switchTodo } from "../api/todosApi";
import { TodoListProps, switchMutationType } from "../types/TodosType";

function TodoList({ todos, isDone }: TodoListProps) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const siwtchMutation = useMutation({
        mutationFn: ({ id, isDone }: switchMutationType) => {
            return switchTodo(id, isDone);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const onUpdateStatusHandler = async ({
        id,
        isDone,
    }: switchMutationType) => {
        siwtchMutation.mutate({ id, isDone });
    };

    const onDeleteHandler = async (id: string) => {
        const confirmed = window.confirm("삭제하시겠습니까?");
        if (confirmed) {
            deleteMutation.mutate(id);
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
                                    onUpdateStatusHandler({
                                        id: todo.id,
                                        isDone: todo.isDone,
                                    })
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
