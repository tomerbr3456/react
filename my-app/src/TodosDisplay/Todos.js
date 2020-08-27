import React from 'react';
import Todo from './Todo'
import './Todos.css';
import { Link } from 'react-router-dom'
const Todos = (props) => {
  const { toggleActive, deleteToDo, updateTodo, Todos } = props
  return (
    <div className="listContainer">
      <Link to='/UpdateCategories' className="editCategories" >Edit Categories</Link>
      <div className="listOfToDos">
        {Todos.map((todo, index) =>
          <Todo key={index}
            updateTodo={updateTodo}
            todo={todo}
            index={index}
            deleteToDo={deleteToDo}
            toggleActive={toggleActive} />
        )}
      </div>
      <div className="takePlace"></div>

    </div>

  )
}

export default Todos