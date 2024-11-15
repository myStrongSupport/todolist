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

  // const [enteredTask, setEnteredTasks] = useState("");
  // const [tasks, setTasks] = useState([]);
  // const [filterBtn, setFilterBtn] = useState("all");
  // const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // ChangeHandler

  const changeEnteredTaskHandler = (event) => {
    setTasksState((prevState) => ({
      ...prevState,
      enteredTask: event.targe.value,
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
    setTasks((prevState) => prevState.filter((task) => task.id !== id));

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem(
      "tasks",
      JSON.stringify(storedTasks.filter((task) => task.id !== id)),
    );
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

  const onSubmitToAddTask = (event) => {
    event.preventDefault();

    // Check for any Error
    if (enteredTask.trim() === "") {
      return;
    }
    if (error) {
      setError(null);
    }

    // Add Task To List
    const newTask = {
      id: (Math.random() * 1000).toFixed(2).toString(),
      text: enteredTask,
      completed: false,
    };
    setTasks((prevState) => [...prevState, newTask]);

    // Add task to local storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([newTask, ...storedTasks]));

    setEnteredTasks("");
  };

  // useEFfect

  // This is not best practice for using  useEffect  for getting tasks, cause we get tasks synchronously
  useEffect(() => {
    const getTasksFromLocalStorage = () => {
      const STORAGE_TASKS = JSON.parse(localStorage.getItem("tasks"));

      if (!STORAGE_TASKS) {
        setError("Sth Went Wrong , Couldn't get tasks from local storage");
      } else {
        setTasks(STORAGE_TASKS);
      }
    };
    getTasksFromLocalStorage();
  }, []);

  return (
    <main>
      <section className="h-screen">
        {/* Container */}
        <div className="mx-auto flex h-full max-w-[1400px] px-10">
          <Header />

          <div className="flex-1 py-10">
            <SearchBox
              onSearchTasks={handleSearchTasks}
              onSelectFilter={handleSelectFilter}
            />

            {/* Form Add Task */}
            <form onSubmit={onSubmitToAddTask} className="my-7">
              <div className="bg-red- flex w-full border-b-2 border-blue-600 md:w-1/2">
                <input
                  type="text"
                  className="w-[80%] px-3 py-4 outline-none"
                  placeholder="Write your plan here"
                  onChange={changeEnteredTaskHandler}
                  value={enteredTask}
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
    </main>
  );
}

export default App;
