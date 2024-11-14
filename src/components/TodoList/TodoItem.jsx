const TodoItem = ({ id, text, completed = false, onChecked, onDelete }) => {
  return (
    <li>
      <div className="flex">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onChecked(id)}
        />
        <p
          className={completed ? "line-through text-gray-500" : "no-underline"}
        >
          {text}
        </p>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="border p-1 text-sm bg-red-500 text-white rounded-lg"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
