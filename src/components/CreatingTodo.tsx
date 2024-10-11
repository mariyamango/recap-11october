import {Todo} from "../types/Todo.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import '../styles/CreatingTodo.css'

function CreatingTodo(props: {
                               callback: (value: Todo) => void
                           }) {
    const [valueTodo, setValueTodo] = useState<Todo>({
        id:"",
        description: "",
        status: "OPEN"
    });
    const [todoCreated, setTodoCreated]  = useState(false);

    function setSimpleValue(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setValueTodo({
            ...valueTodo,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/todo', valueTodo);
            props.callback(response.data);
            setValueTodo({id: "", description: "", status: ""});
            setTodoCreated(true);
            setTimeout(() => setTodoCreated(false), 1000);
        } catch (error) {
            console.log("Some error occurred: ",error)
        }
    }

    return (
        <form className="creating-todo" onSubmit={handleSubmit}>
            <label>Description:</label>
            <input type="text" name="description" required value={valueTodo?.description ?? ""}
                   onChange={event => setSimpleValue(event)}/>
            <button type="submit">Submit</button>
            {todoCreated && <p>New task is created!</p>}
        </form>
    )
}

export default CreatingTodo;