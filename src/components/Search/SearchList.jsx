import { IoSearchCircleSharp } from "react-icons/io5";
import TabButton from "./Button/TabButton";

const SearchBox = ({ onSearchTasks, onSelectFilter }) => {
  return (
    <div className="flex w-full">
      <div className="mr-6 flex w-full items-center rounded-3xl border-2 bg-gray-50">
        <IoSearchCircleSharp size={40} />
        <input
          type="text"
          placeholder="Search Task"
          className="w-full bg-transparent pl-3 text-lg outline-none"
          onChange={onSearchTasks}
        />
      </div>
      <menu className="flex">
        <TabButton onSelect={() => onSelectFilter("all")}>All</TabButton>
        <TabButton onSelect={() => onSelectFilter("completed")}>
          Completed
        </TabButton>
        <TabButton onSelect={() => onSelectFilter("incomplete")}>
          incomplete
        </TabButton>
      </menu>
    </div>
  );
};

export default SearchBox;
