import { useState } from "react";
import addIcon from "./add-icon.svg";
import checkBox from "./check-box.svg";
import checkBoxChecked from "./check-box-checked.svg";
import PetProgressBar from "./subwidgets/PetProgressBar";
import deleteIcon from "./delete-icon.svg";

const TodoForm = ({ onAddItem }) => {
  const [input, setInput] = useState("");

  const atSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    setInput("");
    onAddItem(input);
  };

  return (
    <ul>
      <li className="rounded-xl p-2 shadow-md bg-white">
        <div className="w-full">
          <form onSubmit={atSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder="New task..."
              className="text-md pl-4 w-full"
            />
          </form>
        </div>
      </li>
    </ul>
  );
};

const ListCard = (props) => {
  const { id, done, taskTitle, onClickItem, onClickDelete } = props;

  const atCheckBoxClick = () => onClickItem(id);
  const atDeleteClick = () => onClickDelete(id);

  return (
    <li
      className={`p-3 text-base ${
        done ? "line-through text-gray-500" : "text-gray-800"
      }`}
    >
      <div className="flex">
        <button onClick={atCheckBoxClick}>
          {done ? (
            <img src={checkBoxChecked} alt="checked" className="w-6 h-6" />
          ) : (
            <img src={checkBox} alt="unchecked" className="w-6 h-6" />
          )}
        </button>
        <div className="flex justify-between items-center w-full">
          <div className="text-md ml-3">{taskTitle}</div>
          <button onClick={atDeleteClick} className="pr-2">
            <img src={deleteIcon} alt="delete" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </li>
  );
};

const Index = () => {
  const initialList = [
    { id: "id1", title: "Example1", done: false },
    { id: "id2", title: "Example2", done: false },
  ];
  const [toDoList, setToDoList] = useState(initialList);
  const [createNewItem, setCreateNewItem] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(0);
  const [taskForProgressBar, setTaskForProgressBar] = useState(0);

  const atAddItem = (text) => {
    const item = {
      id: new Date().getTime().toString(),
      title: text,
      done: false,
    };
    setToDoList(toDoList.concat(item));
    setCreateNewItem(false);
  };

  const atClickItem = (id) => {
    const newList = toDoList.map((item) => {
      if (item.id === id) {
        if (!item.done) {
          setTaskCompleted((counter) => counter + 1);
          setTaskForProgressBar((counter) => counter + 1);
        } else {
          setTaskCompleted((counter) => counter - 1);
          setTaskForProgressBar((counter) => Math.max(counter - 1, 0));
        }
        return {
          id: item.id,
          title: item.title,
          done: !item.done,
        };
      }

      return item;
    });
    setToDoList(newList);
  };

  const atClickDelete = (id) => {
    const newList = toDoList.filter((item) => item.id !== id);
    setToDoList(newList);
  };

  const atClickAdd = () => {
    setCreateNewItem(true);
  };

  // Reset only progress bar count
  const onResetProgress = () => {
    setTaskForProgressBar(0);
  };

  return (
    <div className="w-110">
      <div className="p-4 h-100 bg-white rounded-xl shadow-lg">
        <div className="space-y-4">
          <PetProgressBar
            taskForProgressBar={taskForProgressBar}
            onResetProgress={onResetProgress}
          />

          <div className="flex justify-between items-center w-full">
            <div className="pl-2">Today</div>
            <button onClick={atClickAdd} className="pr-2">
              <img src={addIcon} />
            </button>
          </div>

          {createNewItem ? <TodoForm onAddItem={atAddItem} /> : null}

          {toDoList.length ? (
            <ul className="max-h-40 overflow-y-auto scrollbar-thumb-gray-300 scrollbar-track-transparent rounded-xl p-2 shadow-md bg-white">
              {toDoList.map((toDoItem) => (
                <ListCard
                  key={toDoItem.id}
                  id={toDoItem.id}
                  done={toDoItem.done}
                  taskTitle={toDoItem.title}
                  onClickItem={atClickItem}
                  onClickDelete={atClickDelete}
                />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Index;
