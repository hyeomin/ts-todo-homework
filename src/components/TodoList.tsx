import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
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
        <Container className="list">
            <h2>{isDone ? "Done🎉" : "In Progress🔥"}</h2>
            <CardContainer>
                {todos
                    .filter((todo) => todo.isDone === isDone)
                    .map((todo) => {
                        return (
                            <SingleCard className="single-card" key={todo.id}>
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
                                <button
                                    onClick={() => onDeleteHandler(todo.id)}
                                >
                                    삭제
                                </button>
                            </SingleCard>
                        );
                    })}
            </CardContainer>
        </Container>
    );
}

export default TodoList;

const CardContainer = styled.div`
    display: flex;
    column-gap: 15px;
`;
const SingleCard = styled.div`
    width: 250px;
    padding: 15px;
    border: 1px dashed gray;
    border-radius: 15px;
`;

const Container = styled.div``;
