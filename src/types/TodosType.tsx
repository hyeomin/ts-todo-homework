export type Todo = {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
};

export interface TodoListProps {
    todos: Todo[];
    isDone: boolean;
}

export interface RootState {
    todos: Todo[];
    isLoading: boolean;
    isError: boolean;
}

export interface switchMutationType {
    id: string;
    isDone: boolean;
}
