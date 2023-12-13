export type Todo = {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
};

export interface TodoListProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    isDone: boolean;
}

export interface RootState {
    todos: Todo[];
}
