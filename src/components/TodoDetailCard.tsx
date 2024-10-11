import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Todo} from "../types/Todo.tsx";
import axios from "axios";
import "../styles/TodoDetailCard.css"

export default function TodoDetailCard() {

    const {id} = useParams<{ id: string }>();
    const [todo, setTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Todo | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodoById = async () => {
            try {
                const response = await axios.get<Todo>(`/api/todo/${id}`);
                setTodo(response.data);
            } catch (err) {
                setError("Error occurred: " + err);
            } finally {
                setLoading(false);
            }
        };
        fetchTodoById().catch(error => console.log("Some error occurred: ", error));
    }, [id])

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/todo/${id}`);
            navigate('/todo');
        } catch (error) {
            console.log("Some error occurred: ", error)
        }
    }

    const handleEditClick = () => {
        setFormData(todo);
        setIsEditing(true);
    }

    const handleEdit = async () => {
        try {
            if (formData) {
                await axios.put(`/api/todo/${id}`, formData);
                setTodo(formData);
                setIsEditing(false);
            }
        } catch (error) {
            console.log("Some error occurred: ", error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (formData) {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="todo-detail-card">
            {todo ? (
                <div>
                    <h2>Task Details:</h2>
                    {!isEditing ? (
                        <>
                            <div className="todo-card-info">
                                <h3>Description: {todo.description}</h3>
                                <p>Status: {
                                    todo.status === 'OPEN' ? 'Open' :
                                        todo.status === 'IN_PROGRESS' ? 'In progress' :
                                            todo.status === 'DONE' ? 'Done' : 'Unknown'
                                }</p>
                            </div>
                            <div>
                                <button onClick={handleEditClick}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleEdit}>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={formData?.description ?? ""}
                                onChange={handleChange}
                                required
                            />
                            <label>Status:</label>
                            <select
                                name="status"
                                value={formData?.status ?? ""}
                                onChange={handleChange}
                                required
                            >
                                <option value="">...</option>
                                <option value="OPEN">Open</option>
                                <option value="IN_PROGRESS">In progress</option>
                                <option value="DONE">Done</option>
                            </select>
                            <div>
                                <button type="button" onClick={handleEdit}>Save</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            ) : (
                <p>No task found.</p>
            )}
        </div>
    );
}