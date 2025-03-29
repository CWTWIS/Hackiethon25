import { useState } from 'react';
import "./assets"
import "./css"
import Lists from "./"

const Index = () => {
    const [toDoList, setToDoList] = useState([]);

    const handleAddOnClick = () => {
        // Propmt user input
        // Get user imput
        // Create new list card
        // Add task to toDoList
    }

    return (
        <div>
            <Lists/>
        </div>
    )
}

export default Index