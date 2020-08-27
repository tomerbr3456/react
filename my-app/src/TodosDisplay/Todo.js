import React, { useState, useContext } from 'react';
import './Todo.css';
import EditTodo from './EditTodo';
import ReadOnlyTodo from './ReadOnlyTodo';
import { TodoListContext } from '../GeneralFiles/StateManagment'

const Todo = (props) => {
  const [todoList, setTodoList] = useContext(TodoListContext)
  const { index, todo, updateTodo } = props

  const handleDelete = (event) => {
    const id = todo.id
    setTodoList(todoList.filter((todo) => todo.id !== id));
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
          changeTodo={changeTodo}
          setNewTodo={setNewTodo} />
        :
        <ReadOnlyTodo
          handleEditButton={handleEditButton}
          todo={todo} />
      }
    </div>
  )

}
export default Todo