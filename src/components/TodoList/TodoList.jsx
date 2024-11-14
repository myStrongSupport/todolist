import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onChecked, onDelete }) => {
  return (
    <section>
      <div className="container">
        <h2 className="my-10 text-5xl">Tasks</h2>
        <ul className="flex flex-wrap gap-5">
          {tasks.map((todo, index) => (
            <TodoItem
              key={index}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onChecked={onChecked}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
