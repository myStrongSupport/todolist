import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList/TodoList";
import SearchBox from "./components/Search/SearchList.jsx";
import { IoAddOutline } from "react-icons/io5";

// const STORAGE_TASKS = JSON.parse(localStorage.getItem("tasks")) || [];

const getFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("tasks")) || [];

const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function App() {
  // States
  const [tasksState, setTasksState] = useState({
    tasks: [],
    enteredTask: "",
    filteredBtn: "all",
    search: "",
  });

  const [error, setError] = useState(null);

  // Change Handler

  const changeEnteredTaskHandler = (event) => {
    setTasksState((prevState) => ({
      ...prevState,
      enteredTask: event.target.value,
    }));
  };

  // Functions
  const handleCheckedTask = (id) => {
    const updatedTasks = tasksState.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    setTasksState((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
    }));

    saveToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasksState.tasks.filter((task) => task.id !== id);

    setTasksState((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
    }));

    saveToLocalStorage(updatedTasks);
  };

  const handleSelectFilter = (selectedButton) => {
    setTasksState((prevState) => ({
      ...prevState,
      filteredBtn: selectedButton,
    }));
  };

  const handleSearchTasks = (event) => {
    setTasksState((prevState) => ({
      ...prevState,
      search: event.target.value,
      filteredBtn: "all",
    }));
  };

  const filteredTasks = tasksState.tasks.filter((task) => {
    if (tasksState.filteredBtn === "completed") return task.completed;
    if (tasksState.filteredBtn === "incomplete") return !task.completed;

    return task.text.trim().toLowerCase().includes(tasksState.search.trim());
  });

  const handleAddTask = (event) => {
    event.preventDefault();

    // Check for any Error
    if (tasksState.enteredTask.trim() === "") {
      setError("Input should not be empty");
      return;
    }
    if (error) {
      setError(null);
    }

    const newTask = {
      id: (Math.random() * 1000).toFixed(2).toString(),
      text: tasksState.enteredTask,
      completed: false,
    };

    const updatedTasks = [...tasksState.tasks, newTask];
    setTasksState((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
      enteredTask: "",
    }));
    saveToLocalStorage(updatedTasks);
  };

  // useEFfect
  // This is not best practice for using  useEffect  for getting tasks, cause we get tasks synchronously
  useEffect(() => {
    const tasks = getFromLocalStorage();

    if (!tasks) {
      setError("Sth Went Wrong , Couldn't get tasks from local storage");
    } else {
      setTasksState((prevState) => ({ ...prevState, tasks: tasks }));
    }
  }, []);

  return (
    <>
      <section className="h-screen">
        <div className="mx-auto flex h-full max-w-[1400px] px-10">
          <Header />

          <div className="flex-1 py-10">
            <SearchBox
              onSearchTasks={handleSearchTasks}
              onSelectFilter={handleSelectFilter}
            />

            {/* Form Add Task */}
            <form onSubmit={handleAddTask} className="my-7">
              <div className="bg-red- flex w-full border-b-2 border-blue-600 md:w-1/2">
                <input
                  type="text"
                  className="w-[80%] px-3 py-4 outline-none"
                  placeholder="Write your plan here"
                  onChange={changeEnteredTaskHandler}
                  value={tasksState.enteredTask}
                />
                <button className="flex w-[20%] items-center text-blue-600">
                  <IoAddOutline size={25} />
                  <span className="ml-3"> Add Task</span>
                </button>
              </div>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            {/* List Tasks */}
            <TodoList
              tasks={filteredTasks}
              onChecked={handleCheckedTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
