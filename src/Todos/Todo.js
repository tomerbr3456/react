import React, { useState } from 'react';
import PropTypes from 'prop-types'
import EditTodo from './EditTodo';
import './Todo.css'
import ReadOnlyTodo from './ReadOnlyTodo';

const Todo = (props) => {
  const { index, todo, updateTodo, handleDelete } = props
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditChange = () => {
    setIsEditMode(!isEditMode)
  }

  const handleDeleteSubmition = () => {
    handleDelete(todo.id)
    toggleEditChange()
  }

  const handleEditButton = (event) => {
    toggleEditChange()
    event.stopPropagation()
  }

  const [newTodo, setNewTodo] = useState(todo)

  const handleTodoChanges = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target
    setNewTodo({ ...newTodo, [name]: value })
  }

  const changeTodo = () => {
    let todoFields = { ...newTodo }
    if (newTodo.name === '') {
      todoFields = { ...todoFields, name: todo.name }
    }

    updateTodo(todo.id, todoFields)
    toggleEditChange()
  }

  let todoListRowClass = 'isActiveButton'
  todoListRowClass = newTodo.isActive ? `${todoListRowClass} Active` : todoListRowClass
  return (
    <div key={index.toString()} className={todoListRowClass}>
      {isEditMode
        ? (
          <EditTodo
            handleTodoChanges={handleTodoChanges}
            newTodo={newTodo}
            handleDelete={handleDeleteSubmition}
            changeTodo={changeTodo}
            setNewTodo={setNewTodo}
          />
        ) : (
          <ReadOnlyTodo
            handleEditButton={handleEditButton}
            todo={todo}
          />
        )}
    </div>
  )
}
Todo.propTypes = {
  todo: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  updateTodo: PropTypes.func.isRequired,
}
export default Todo