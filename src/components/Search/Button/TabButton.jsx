const TabButton = ({ children, onSelect }) => {
  return (
    <li className="mr-2 grid place-content-center">
      <button
        onClick={onSelect}
        className="rounded-xl border-2 px-4 py-1 outline-none"
      >
        {children}
      </button>
    </li>
  );
};

export default TabButton;
