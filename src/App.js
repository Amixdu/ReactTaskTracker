import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react"
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
      {
          id: 1,
          text: "One",
          day: "Jan 1",
          reminder: true
      },
      {
          id: 2,
          text: "Two",
          day: "Jan 2",
          reminder: true
      },
      {
          id: 3,
          text: "Three",
          day: "Jan 3",
          reminder: false
      }]
  )

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  // Alternative To Update ShowAddTask
  // function onAdd() {
  //   setShowAddTask(!showAddTask)
  // }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask ? <AddTask onAdd = {addTask}/> : ""}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks'}
    </div>
  );
}

export default App;
