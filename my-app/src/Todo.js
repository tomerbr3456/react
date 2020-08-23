import React, { useState } from 'react';
import './Todo.css';

const Todo = (props) => {

  const { index, todo, editTodo, deleteToDo } = props

  const handleDelete = (event) => {
    deleteToDo(todo.id)
    toggleEditChange()

    event.stopPropagation()
  }
  //const handleToggleActive = () => {
  //toggleActive(props.todo.id)
  //}
  const [toggleEdit, setToggleEdit] = useState(false);


  const toggleEditChange = () => {
    setToggleEdit(!toggleEdit)
  }

  const handleEditButton = (event) => {
    toggleEditChange()
    event.stopPropagation()
  }

  const [newTodo, setNewTodo] = useState(todo)

  const handleTodoChanges = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setNewTodo({ [name]: value })
  }

  const updateTodo = (event) => {
    // generic update
    editTodo(todo.id, newTodo)
    toggleEditChange()
  }

  let todoListRowClass = 'isActiveButton'
  todoListRowClass = newTodo.isActive ? todoListRowClass + ' Active' : todoListRowClass
  return (
    <div key={index.toString()} className={todoListRowClass}>
      {toggleEdit

        ? <div className={"deleteAndCheckBoxActiveContainer"}>
          <input name={'isActive'} className={"checkBoxActive"} type="checkbox" onClick={handleTodoChanges} checked={newTodo.isActive ? true : false} ></input>
          <div className={"deleteItem"} onClick={handleDelete}>{'Delete'}</div>
          <input name={'name'} className={"updateName"} type="text" value={newTodo.name} placeholder={"enter new name"} onChange={handleTodoChanges}></input>
          <div className={"updateChanges"} onClick={updateTodo}>{'Done'}</div>
        </div>
        : <div className={"editButtonAndTodoNameContainer"}>
          <div className={"editButton"} onClick={handleEditButton}>
            {'EditToDo'}
          </div>
          <div className={"toDo"} >{todo.name}</div></div>}

    </div>
  )

}
export default Todo