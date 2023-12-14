import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
        <div>
            <div className="header">헤더</div>
            <div className="form-body">
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label>제목</label>
                        <input
                            name="title"
                            value={title}
                            onChange={onChangeHandler}
                            placeholder="제목 을 입력하세요."
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
                </form>
            </div>
            <TodoList todos={todos} isDone={false} />
            <TodoList todos={todos} isDone={true} />
        </div>
    );
}

export default App;
