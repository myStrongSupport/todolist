const TodoItem = ({ id, text, completed = false, onChecked, onDelete }) => {
  return (
    <li className="w-1/5 rounded-lg bg-lime-200 p-5">
      <div className="flex items-start justify-start">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onChecked(id)}
        />
        <p
          className={completed ? "text-gray-500 line-through" : "no-underline"}
        >
          {text}
        </p>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="rounded-lg border bg-red-500 p-1 text-sm text-white"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
