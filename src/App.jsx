import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList/TodoList";
import SearchBox from "./components/Search/SearchList.jsx";
import { IoAddOutline } from "react-icons/io5";

// const STORAGE_TASKS = JSON.parse(localStorage.getItem("tasks")) || [];

function App() {
  // States
  const [enteredTask, setEnteredTasks] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filterBtn, setFilterBtn] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // ChangeHandler

  const changeEnteredTaskHandler = (event) => {
    setEnteredTasks(event.target.value);
  };

  // Functions
  const handleCheckedTask = (id) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    localStorage.setItem(
      "tasks",
      JSON.stringify(
        storedTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      ),
    );
  };

  const onSubmitToAddTask = (event) => {
    event.preventDefault();

    if (enteredTask.trim() === "") {
      return;
    }

    const newTask = {
      id: (Math.random() * 1000).toFixed(2).toString(),
      text: enteredTask,
      completed: false,
    };

    setTasks((prevState) => [...prevState, newTask]);

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    localStorage.setItem("tasks", JSON.stringify([newTask, ...storedTasks]));

    setEnteredTasks("");
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
        <div className="mx-auto flex h-full max-w-[1400px] px-10">
          <Header />

          <div className="flex-1 py-10">
            <SearchBox
              onSearchTasks={handleSearchTasks}
              onSelectFilter={handleSelectFilter}
            />

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

            {/* Search by Button */}

            {error && <p className="text-red-500">{error}</p>}
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
