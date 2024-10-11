import './styles/App.css'
import {Link, Route, Routes} from "react-router-dom";
import WelcomePage from "./components/WelcomePage.tsx";
import Gallery from "./components/Gallery.tsx";
import CreatingTodo from "./components/CreatingTodo.tsx";
import {Todo} from "./types/Todo.tsx";
import {v4 as uuidv4} from "uuid";
import TodoDetailCard from "./components/TodoDetailCard.tsx";

function App() {
    const addNewTodo = function (todo: Todo) {
        todo.id = todo.id = uuidv4();
    }

    return (
        <>
            <nav className="menu">
                <ul className="menu-links">
                    <li><Link to="/">Welcome Page</Link></li>
                    <li><Link to="/todo">All tasks</Link></li>
                    <li><Link to="/create">Create new task</Link></li>
                </ul>
            </nav>
            <div className="simple-container">
                <Routes>
                    <Route path="/" element={<WelcomePage/>}/>
                    <Route path="/todo" element={<Gallery/>}/>
                    <Route path="/todo/:id" element={<TodoDetailCard/>}/>
                    <Route path="/create" element={<CreatingTodo callback={addNewTodo}/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
