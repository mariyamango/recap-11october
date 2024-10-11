import {Todo} from "../types/Todo.tsx";
import TodoCard from "./TodoCard.tsx";
import "../styles/TodoGallery.css"

type TodoGalleryProps = {
    todos: Todo[];
}

export default function TodoGallery(props: Readonly<TodoGalleryProps>){
    const openTodos = props.todos.filter(todo => todo.status === "OPEN");
    const inProgressTodos = props.todos.filter(todo => todo.status === "IN_PROGRESS");
    const doneTodos = props.todos.filter(todo => todo.status === "DONE");

    return (
        <div className="todo-gallery">
            <div className="todo-column">
                <h2>Open</h2>
                {openTodos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            </div>
            <div className="todo-column">
                <h2>In Progress</h2>
                {inProgressTodos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            </div>
            <div className="todo-column">
                <h2>Done</h2>
                {doneTodos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
}