import { useState } from 'react';
import "./assets"
import "./css"
import TodoForm from './ToDoForm';
import ListCard from './ListCard';

const Index = () => {
    const [toDoList, setToDoList] = useState(initialList);
    // const [level, setLevel] = useState(0);
    // const [taskcompleted, setTaskCompleted] = useState(0);

    const initialList = [
        { id: 'id1', title: 'Example', done: false }
    ];

    const atAddItem = (text) => {
        const item = {
            id: new Date().getTime().toString(),
            text,
            done: false,
        };
        setToDoList(toDoList.concat(item));
    };

    const atClickItem = (id) => {
        const newList = toDoList.map((item) => {
          if (item.id === id) {
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

    return (
        <section>
            <div className="flex-none">
                <div>character goes here</div>
                <div>add button goes here</div>
            </div>
            <TodoForm onAddItem={atAddItem}/>
            <ul>
                {toDoList.map(toDoItem => <ListCard key={toDoItem.id} id={toDoItem.id} taskTitle={toDoItem.title} onClickItem={atClickItem}/>)}
            </ul>
        </section>
    )
}

export default Index