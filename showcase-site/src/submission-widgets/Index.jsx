import { useState } from 'react';
import addIcon from './add-icon.svg';
import checkBox from './check-box.svg';
import checkBoxChecked from './check-box-checked.svg';
import MyWidget from './Lotties_Test';

const TodoForm = ({ onAddItem }) => {
  const [input, setInput] = useState('');

  const atSubmit = (e) => {
    e.preventDefault();
    if (input === '') {
      return;
    }
    setInput('');
    onAddItem(input);
  };

  return (
    <ul>
      <li className="rounded-xl p-2 shadow-md bg-white">
        <div className="w-75">
          <form onSubmit={atSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder="New task..."
              className="text-md pl-3"
            />
          </form>
      </div>
      </li>
    </ul>
  );
};

const ListCard = (props) => {  
    const {id, done, taskTitle, onClickItem} = props;
    
    let className = 'list-item';
    if (done) {
        className += ' done';
    }

    const atClick = () => {
        onClickItem(id);
    };

    return (
      <li className={`p-3 text-base ${done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
        <div className="flex items-center justify-between w-75">
          <div className="text-md">{taskTitle}</div>
          <button onClick={atClick}>
            {done ? (
              <img src={checkBoxChecked} alt="checked" className="w-6 h-6" />
            ) : (
              <img src={checkBox} alt="unchecked" className="w-6 h-6" />
            )}
          </button>
        </div>
      </li>
    )
}

const Index = () => {
    const initialList = [
      { id: 'id1', title: 'Example1', done: false },
      { id: 'id2', title: 'Example2', done: false }
    ];
    const [toDoList, setToDoList] = useState(initialList);
    const [createNewItem, setCreateNewItem] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(0);

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
              setTaskCompleted((counter) => counter + 1)
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

    const atClickAdd = () => {
      setCreateNewItem(true);
    }

    return (
      <div className="w-100">
        <div className="p-6 h-100 bg-white rounded-xl shadow-lg">
          <div className="space-y-4">
      
          <MyWidget/>


          <div className="flex items-center justify-between w-86">
            <div>Today</div>
            <button onClick={atClickAdd}>
              <img src={addIcon}/>
            </button>
          </div>
          
          {createNewItem ? <TodoForm onAddItem={atAddItem}/> : null }

          <ul className="max-h-50 overflow-y-auto scrollbar-thumb-gray-300 scrollbar-track-transparent rounded-xl p-2 shadow-md bg-white">
              {toDoList.map(toDoItem => <ListCard key={toDoItem.id} id={toDoItem.id} done={toDoItem.done} taskTitle={toDoItem.title} onClickItem={atClickItem}/>)}
          </ul>
        </div>
        </div>
      </div>
    )
}

export default Index