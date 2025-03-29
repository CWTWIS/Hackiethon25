import { useState } from 'react';
import addIcon from './add-icon.svg';
import checkBox from './check-box.svg';
import checkBoxChecked from './check-box-checked.svg';
import './Index.css'

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
    <section>
      <form onSubmit={atSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Add new task..."
        />
      </form>
    </section>
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
      <li className={className}>
        <div className="flex items-center justify-between w-84">
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
      <div className="max-w-500">
        <div className="p-6 mx-auto bg-white rounded-xl shadow-lg">
          <div className="space-y-4">
      
          <div>Task completed {taskCompleted}</div>

          <div className="flex">
            <div className="mr-70">
              Today
            </div>
            <button onClick={atClickAdd}>
              <img src={addIcon}/>
            </button>
          </div>
          
          {createNewItem ? <TodoForm onAddItem={atAddItem}/> : null }

          <ul>
              {toDoList.map(toDoItem => <ListCard key={toDoItem.id} id={toDoItem.id} done={toDoItem.done} taskTitle={toDoItem.title} onClickItem={atClickItem}/>)}
          </ul>
        </div>
        </div>
      </div>
    )
}

export default Index