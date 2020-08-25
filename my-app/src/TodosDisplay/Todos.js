import React from 'react';
import Todo from './Todo'
import './Todos.css';
const Todos = (props) => {
  const { toggleActive, deleteToDo, updateTodo, Todos } = props
  return (
    <div className="listContainer">
      <div className="listOfToDos">
        {Todos.map((todo, index) =>
          <Todo updateTodo={updateTodo}
            todo={todo}
            index={index}
            deleteToDo={deleteToDo}
            toggleActive={toggleActive} />
        )}
      </div>

    </div>

  )
}

export default Todos