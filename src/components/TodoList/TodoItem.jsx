const TodoItem = ({ id, text, completed = false, onChecked }) => {
  return (
    <li className="flex">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onChecked(id)}
      />
      <p className={completed ? "line-through text-gray-500" : "no-underline"}>
        {text}
      </p>
    </li>
  );
};

export default TodoItem;
