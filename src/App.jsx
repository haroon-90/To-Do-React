import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Edit_icon from './assets/edit.svg'
import Delete_icon from './assets/delete.svg'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();  // Auto-focus when component loads
  }, []);

  const toggleComplete = (e) => {
    setShowCompleted(e.target.checked); // update state on check/uncheck of checkbox
  };

  const filteredTodos = showCompleted ? todos : todos.filter(todo => !todo.iscompleted);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(todostring);
      setTodos(todos);
    }
  }, [])

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  }, [todo]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  
  const handleAdd = () => {
    if (!todo.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    setTodos([...todos, { todo, id: uuidv4(), iscompleted: false }]);
    setTodo("");
    inputRef.current.focus();
  };

  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    setTodos(newtodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo)
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newtodos);
    inputRef.current.focus();
  };

  const handleDelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }
    setTodos(newtodos);
    inputRef.current.focus();
    localStorage.setItem("todos", JSON.stringify(newtodos));
  };

  return (
    <>
      <div id="main"></div>
      <Navbar />
      <main className="container max-w-[80vw] mx-auto mt-5 pb-10 p-5 pt-0 bg-indigo-100 rounded-2xl">
        <div className='flex justify-center bg-amber-300 rounded-bl-3xl rounded-br-3xl'>
          <h1 className='font-bold text-2xl text-indigo-800 p-5'>&lt;&#x2f;&gt; Taskify - Your Task Manager</h1>
        </div>
        <div className='container p-2 mx-auto'>
          <h2 className='font-bold text-xl m-2 text-gray-800'>Add Task</h2>
          <div>
            <input
              type="text"
              value={todo}
              ref={inputRef}
              onChange={handlechange}
              className='newtask border border-gray-500 rounded-lg p-2 mr-2 focus:outline-none focus:border-blue max-w-[50%] min-w-[50%] focus:ring-2 focus:ring-blue-500'
            />
            <button className='bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-amber-300 transition-colors' onClick={handleAdd}>
              Save
            </button>
          </div>
        </div>
        <div className="checkbox m-2">
          <input onChange={toggleComplete} type="checkbox" name="Show Completed Tasks" id='show_completed_tasks' className='mr-2' />
          <span>Completed Tasks</span>
        </div>
        <h2 id='yourtasks' className='font-bold text-xl m-2 text-gray-800'>Tasks To Do</h2>
        <div className='TODOS'>
          {filteredTodos.length === 0 && <h1 className='text-center text-2xl font-bold text-gray-800'>No Task Found</h1>}
          {filteredTodos.map(items => {
            return (
              <div key={items.id} className="todoscontainer m-2 p-2 mx-auto flex justify-between items-center">
              <div>
                <input checked={items.iscompleted} onChange={handlecheckbox} type="checkbox" name={items.id} id="" className='mr-2' />
                <span className={items.iscompleted ? "line-through" : ""} name="todo">{items.todo}</span>
              </div>
              <div className='flex gap-2'>
                <img alt='edit' src={Edit_icon} title='Edit' className='h-[2.5rem] bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-amber-300 transition-colors' onClick={(e) => { handleEdit(e, items.id) }}></img>
                <img alt='delete' src={Delete_icon} title='Delete' className='h-[2.5rem] bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-amber-300 transition-colors' onClick={(e) => { handleDelete(e, items.id) }}></img>
              </div>
              </div>
            )
          })}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
