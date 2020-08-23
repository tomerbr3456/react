import React from 'react';
import Todo from './Todo'
import './Todos.css';
// destructring = {}
const Todos = (props) => {
  const { toggleActive, deleteToDo, editTodo, Todos } = props
  return (
    <div className="listContainer">
      <div className="listOfToDos">
        {/* rename filteredTodosByNameAndCategory */}
        {Todos.map((todo, index) =>
          <Todo editTodo={editTodo}
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