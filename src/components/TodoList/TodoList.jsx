import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onChecked }) => {
  return (
    <section>
      <div className="container">
        <h2>List of tasks</h2>
        <ul>
          {tasks.map((todo, index) => (
            <TodoItem
              key={index}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onChecked={onChecked}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
