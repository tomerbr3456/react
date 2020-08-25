import React from 'react';
import './Todo.css';
const EditTodo = (props) => {

  const { handleTodoChanges, newTodo, handleDelete, changeTodo, } = props
  return (

    <div className={"deleteAndCheckBoxActiveContainer"}>
      <input name={'isActive'} className={"checkBoxActive"} type="checkbox"
        onClick={handleTodoChanges} checked={newTodo.isActive ? true : false} />
      <div className={"deleteItem"} onClick={handleDelete}>{'Delete'}</div>
      <input name={'name'} className={"updateName"} type="text"
        value={newTodo.name} placeholder={"enter new name"} onChange={handleTodoChanges}></input>
      <div className={"updateChanges"} onClick={changeTodo}>{'Done'}</div>
    </div>
  )
}

export default EditTodo