import React, { useContext, useState, } from 'react';
import './Todo.css';
import { CategoryOptionsContext } from '../GeneralFiles/StateManagment'
const EditTodo = (props) => {
  const [selectCategory, setSelectCategory] = useState('sports')

  const pickCategory = (event) => {
    setSelectCategory(event.target.value)
    setNewTodo({ ...newTodo, Category: event.target.value })
  }


  const [CategoryOptions] = useContext(CategoryOptionsContext)

  const { handleTodoChanges, newTodo, handleDelete, changeTodo, setNewTodo } = props
  return (

    <div className={"deleteAndCheckBoxActiveContainer"}>
      <input name={'isActive'} className={"checkBoxActive"} type="checkbox"
        onClick={handleTodoChanges} checked={newTodo.isActive ? true : false} />
      <div className={"deleteItem"} onClick={handleDelete}>{'Delete'}</div>
      <input name={'name'} className={"updateName"} type="text"
        value={newTodo.name} placeholder={"enter new name"} onChange={handleTodoChanges} />
      <select className="selectCategory" value={selectCategory} onChange={pickCategory} >
        {CategoryOptions.map((Category, index) =>
          <option key={index} value={Category}>{Category}</option>
        )}
      </select>
      <div className={"updateChanges"} onClick={changeTodo}>{'Done'}</div>
    </div>
  )
}

export default EditTodo