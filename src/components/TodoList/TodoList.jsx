import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <section>
      <div className="container">
        <h1>List of tasks</h1>
        <ul>
          {[1, 2, 3].map((todo, index) => (
            <TodoItem key={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
