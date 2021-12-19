import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react"

function App() {
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

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="container">
      <Header title = "Title"/>
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}/> : 'No Tasks'}
    </div>
  );
}

export default App;
