import { useState } from "react";
import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList/TodoList";
import TabButton from "./components/Button/TabButton.jsx";

function App() {
  // States
  const [enteredTask, setEnteredTasks] = useState("");
  const [filterBtn, setFilterBtn] = useState("all");
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([
    { id: "1", text: "Get Work", completed: false },
    { id: "2", text: "Get Home", completed: false },
    { id: "3", text: "Get Car", completed: false },
  ]);

  // ChangeHandler

  const changeEnteredTaskHandler = (event) => {
    setEnteredTasks(event.target.value);
  };

  // Functions
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

  const handleSelectFilter = (selectedButton) => {
    setFilterBtn(selectedButton);
  };

  const handleSearchTasks = (event) => {
    setSearch(event.target.value);
    if (filterBtn !== "all") {
      setFilterBtn("all");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterBtn === "completed") return task.completed;
    if (filterBtn === "incomplete") return !task.completed;

    return task.text.trim().toLowerCase().includes(search.trim());
  });

  return (
    <>
      <Header />

      {/* Search Bar Handler  */}
      <div>
        <input type="text" onChange={handleSearchTasks} />
      </div>

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

      {/* Search by Button */}
      <menu className="flex">
        <TabButton onSelect={() => handleSelectFilter("all")}>All</TabButton>
        <TabButton onSelect={() => handleSelectFilter("completed")}>
          Completed
        </TabButton>
        <TabButton onSelect={() => handleSelectFilter("incomplete")}>
          incomplete
        </TabButton>
      </menu>
      <TodoList
        tasks={filteredTasks}
        onChecked={handleCheckedTask}
        onDelete={handleDeleteTask}
      />
    </>
  );
}

export default App;
