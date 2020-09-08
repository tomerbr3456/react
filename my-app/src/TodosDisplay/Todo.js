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
    // תקרא על ניהול נכון יותר של הסטייט שלך בקונטקסט של ריאקט
    // אתה לא רוצה לחזור שוב ושוב על השורה הזו בשביל להסיר איבר
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

  // זה היה בשביל להראות לך כמה רנדרים קורים מכל שינוי של טודו
  console.log(`render ${todo.name}`)

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