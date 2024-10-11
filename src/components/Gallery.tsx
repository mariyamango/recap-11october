import {Todo} from "../types/Todo.tsx";
import React, {useEffect} from "react";
import axios from "axios";
import TodoGallery from "./TodoGallery.tsx";
import '../styles/Gallery.css'

function Gallery (){
    const [todos, setTodos] = React.useState<Todo[]>([]);

    useEffect(()=>{
        const fetchTodos = async () => {
            const response = await axios.get<Todo[]>('/api/todo')
            setTodos(response.data);
        }
        fetchTodos().catch(error => console.log("Some error occurred: ",error))
    },[])

    return <div className="gallery">
        {
            <TodoGallery todos={todos}/>
        }
    </div>
}

export default Gallery;