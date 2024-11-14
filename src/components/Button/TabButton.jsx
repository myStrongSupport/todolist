const TabButton = ({ children, onSelect }) => {
  return (
    <li className="border mr-2 p-1 bg-slate-400">
      <button onClick={onSelect}>{children}</button>
    </li>
  );
};

export default TabButton;
