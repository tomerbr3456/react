import React, { useState } from 'react';
import './Todo.css';
import EditTodo from './EditTodo';
import ReadOnlyTodo from './ReadOnlyTodo';

const Todo = (props) => {
  const { index, todo, updateTodo, deleteToDo } = props

  const handleDelete = (event) => {
    deleteToDo(todo.id)
    toggleEditChange()
  }

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditChange = () => {
    setIsEditMode(!isEditMode)
  }

  const handleEditButton = (event) => {
    toggleEditChange()
    event.stopPropagation()
  }

  const [newTodo, setNewTodo] = useState(todo)

  const handleTodoChanges = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name
    setNewTodo({ ...newTodo, [name]: value })
  }

  const changeTodo = (event) => {
    let todoFields = { ...newTodo }
    if (newTodo.name === '') {
      todoFields = { ...todoFields, name: todo.name }
    }

    updateTodo(todo.id, todoFields)
    toggleEditChange()
  }

  let todoListRowClass = 'isActiveButton'
  todoListRowClass = newTodo.isActive ? todoListRowClass + ' Active' : todoListRowClass
  return (
    <div key={index.toString()} className={todoListRowClass}>
      {isEditMode
        ?
        <EditTodo
          handleTodoChanges={handleTodoChanges}
          newTodo={newTodo}
          handleDelete={handleDelete}
          changeTodo={changeTodo} />
        :
        <ReadOnlyTodo
          handleEditButton={handleEditButton}
          todo={todo} />
      }
    </div>
  )

}
export default Todo