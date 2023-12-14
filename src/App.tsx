import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { addTodo, fetchTodos } from "./api/todosApi";
import TodoList from "./components/TodoList";
import { Todo } from "./types/TodosType";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const {
        isLoading,
        isError,
        data: todos,
    } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });

    console.log("과연", todos);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "content") {
            setContent(value);
        }
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTodo: Omit<Todo, "id"> = {
            title,
            content,
            isDone: false,
        };
        addMutation.mutate(newTodo);
        setTitle("");
        setContent("");
    };

    if (isLoading) {
        return <div>로딩 중입니다...</div>;
    }

    return (
        <Container>
            <Header className="header">
                <span>My Todo List</span>
                <span>공부 가주아아</span>
            </Header>
            <FormContainer className="form-body">
                <Form onSubmit={onSubmitHandler}>
                    <h3>할 일을 입력하세요!</h3>
                    <div>
                        <label>제목</label>
                        <input
                            name="title"
                            value={title}
                            onChange={onChangeHandler}
                            placeholder="제목을 입력하세요."
                        />
                    </div>
                    <div>
                        <label>내용</label>
                        <input
                            name="content"
                            value={content}
                            onChange={onChangeHandler}
                            placeholder="내용을 입력하세요."
                        />
                    </div>
                    <button type="submit">추가하기</button>
                </Form>
            </FormContainer>
            <TodoList todos={todos} isDone={false} />
            <TodoList todos={todos} isDone={true} />
        </Container>
    );
}

export default App;

const Container = styled.div`
    display: flex;
    flex-direction: column;

    max-width: 1200px;
    min-width: 800px;

    background-color: pink;
    margin: 0 auto;
    padding: 10px 30px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;

    padding: 10px;
`;

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: lightblue;
    padding: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    padding: 20px;
    border-radius: 10px;

    background-color: pink;

    & div {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;

        & input {
            padding: 3px 10px;
            width: 300px;
        }
    }

    & button {
        padding: 4px;
    }
`;
