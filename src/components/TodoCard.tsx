import {Todo} from "../types/Todo.tsx";
import {Link} from "react-router-dom";
import '../styles/TodoCard.css'

type TodoCardProps = {
    todo: Todo;
}

export default function TodoCard(props: Readonly<TodoCardProps>) {
    return (
        <Link to={"/todo/" + props.todo.id}>
            <div className="todo-card">
                <h3>{props.todo.description}</h3>
            </div>
        </Link>
    )
}