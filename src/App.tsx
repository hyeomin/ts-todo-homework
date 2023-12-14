import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uuid } from "uuidv4";
import "./App.css";
import TodoList from "./components/TodoList";
import { Todo } from "./types/TodosType";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTodos = async () => {
            const { data } = await axios.get<Todo[]>(
                `http://localhost:4000/todos`
            );
            setTodos(data);
        };
        fetchTodos();
    }, []);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "content") {
            setContent(value);
        }
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTodo = {
            id: uuid(),
            title,
            content,
            isDone: false,
        };
        await axios.post(`http://localhost:4000/todos`, newTodo);
        setTodos([...todos, newTodo]);
        setTitle("");
        setContent("");
    };

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
                            placeholder="내용 을 입력하세요."
                        />
                    </div>
                    <div>
                        <label>내용</label>
                        <input
                            name="content"
                            value={content}
                            onChange={onChangeHandler}
                            placeholder="제목을 입력하세요."
                        />
                    </div>
                    <button type="submit">추가하기</button>
                </form>
            </div>
            <TodoList todos={todos} setTodos={setTodos} isDone={false} />
            <TodoList todos={todos} setTodos={setTodos} isDone={true} />
        </div>
    );
}

export default App;
