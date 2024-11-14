import { useState } from "react";
import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [tasks, setTasks] = useState([
    { id: "1", text: "Get Work", completed: false },
  ]);
  return (
    <>
      <Header />
      <TodoList tasks={tasks} />
    </>
  );
}

export default App;
