import { useState } from "react";
import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [tasks, setTasks] = useState([
    { id: "1", text: "Get Work", completed: false },
    { id: "2", text: "Get Home", completed: false },
    { id: "3", text: "Get Car", completed: false },
  ]);

  const handleCheckedTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <>
      <Header />
      <TodoList tasks={tasks} onChecked={handleCheckedTask} />
    </>
  );
}

export default App;
