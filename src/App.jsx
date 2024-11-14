import { useState } from "react";
import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [tasks, setTasks] = useState([
    { id: "1", text: "Get Work", completed: false },
    { id: "2", text: "Get Home", completed: false },
    { id: "3", text: "Get Car", completed: false },
  ]);

  const [enteredTask, setEnteredTasks] = useState("");

  const changeEnteredTaskHandler = (event) => {
    setEnteredTasks(event.target.value);
  };

  const handleCheckedTask = (id) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    const newTask = {
      id: (Math.random() * 1000).toFixed(2).toString(),
      text: enteredTask,
      completed: false,
    };

    setTasks((prevState) => [...prevState, newTask]);
    setEnteredTasks("");
  };

  const handleDeleteTask = (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  return (
    <>
      <Header />
      <form onSubmit={handleAddTask}>
        <div className="border border-gray-500 w-60 flex">
          <input
            type="text"
            className="border"
            placeholder="add task"
            onChange={changeEnteredTaskHandler}
            value={enteredTask}
          />
          <button className="px-3 py-1 bg-blue-600 rounded-md text-white ">
            Add
          </button>
        </div>
      </form>
      <TodoList
        tasks={tasks}
        onChecked={handleCheckedTask}
        onDelete={handleDeleteTask}
      />
    </>
  );
}

export default App;
