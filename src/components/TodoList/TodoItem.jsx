import { MdDeleteSweep } from "react-icons/md";

const TodoItem = ({ id, text, completed = false, onChecked, onDelete }) => {
  return (
    <li className="font-title max-h-max w-1/5 rounded-lg bg-lime-200 p-5 text-right shadow-xl">
      {/* Content */}
      <div className="mb-5 flex items-start justify-start text-left">
        <label className="custom-checkbox mt-1 grid cursor-pointer place-content-center rounded-xl bg-blue-600">
          <input
            type="checkbox"
            checked={completed}
            className="mt-2 hidden cursor-pointer"
            onChange={() => onChecked(id)}
          />
          <span className="checkmark inline-block h-[18px] w-[18px] rounded-md"></span>
        </label>
        <p
          className={
            completed
              ? "px-2 capitalize text-gray-500 line-through"
              : "w-90% px-2 capitalize no-underline"
          }
        >
          {text}
        </p>
      </div>
      {/* Action */}
      <button onClick={() => onDelete(id)} className="p-1 text-sm text-red-600">
        <MdDeleteSweep size={25} />
      </button>
    </li>
  );
};

export default TodoItem;
