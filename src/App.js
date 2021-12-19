import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromBackend = await fetchTasks()
      setTasks(tasksFromBackend)
    }


    getTasks()
  }, [])

  // Fetch data from mock backend
  const fetchTasks = async () => {
    const res = await fetch ('http://localhost:5000/tasks')
    // awaiting for response
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch (`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
    // console.log(task)
    const res = await fetch('http://localhost:5000/tasks/',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },

      body: JSON.stringify(task)

    })

    const newTask = await res.json()

    setTasks([...tasks, newTask])

  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder (Update)
  const toggleReminder = async (id) => {
    // getting the task fro the server
    const taskToToggle = await fetchTask(id)

    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
      task.id === id ? {...task, reminder: data.reminder} : task)
    )
  }

  // Alternative To Update ShowAddTask
  // function onAdd() {
  //   setShowAddTask(!showAddTask)
  // }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
          <Routes>
            <Route path = '/' element = {
               <>
                {showAddTask ? <AddTask onAdd = {addTask}/> : ""}
                {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No Tasks')}
              </>
            } />
            <Route path='/about' element = {<About />} />
          </Routes>
        
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
