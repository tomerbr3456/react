import React from 'react';
import './Todo.css';

const ReadOnlyTodo = (props) => {
  const { handleEditButton, todo, } = props
  return (
    <div className={"editButtonAndTodoNameContainer"}>
      <div className={"editButton"} onClick={handleEditButton}>
        {'EditToDo'}
      </div>
      <div className={"toDo"} >{todo.name}</div>
    </div>
  )
}

export default ReadOnlyTodo