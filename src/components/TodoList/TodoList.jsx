import TodoItem from "./TodoItem";

const TodoList = ({ tasks }) => {
  return (
    <section>
      <div className="container">
        <h2>List of tasks</h2>
        <ul>
          {tasks.map((todo, index) => (
            <TodoItem key={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
