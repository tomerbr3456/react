import React, { useContext, useState, } from 'react';
import { CategoryContext } from '../StateManagment/CategoryContext'
import { createUseStyles } from 'react-jss'

const EditTodoStyle = createUseStyles({
  deleteAndCheckBoxActiveContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },
  checkBoxActive: {
    height: '30%',
    width: '2%',
    right: '150px'
  },
  deleteItem: {
    width: "10%",
    float: "left",
    fontSize: "20px",
    backgroundColor: "dodgerblue"
  },
  updateName: {
    "width": "30%",
    "height": "50%",
    "fontSize": "20px",
    "border": "1px solid #ccc",
    "borderRadius": "4px",
    "boxSizing": "border-box"
  },
  selectCategory: {
    "backgroundColor": "DodgerBlue",
    "height": "55px",
    "width": "70px"
  },
  "updateChanges": {
    "width": "100px",
    "fontSize": "20px"
  }
})


const EditTodo = (props) => {
  const { handleTodoChanges, newTodo, handleDelete, changeTodo, setNewTodo } = props
  const [selectCategory, setSelectCategory] = useState(newTodo.category)

  const pickCategory = (event) => {
    setSelectCategory(event.target.value)
    setNewTodo({ ...newTodo, category: event.target.value })
  }

  const [categories] = useContext(CategoryContext)
  const classes = EditTodoStyle()
  return (

    <div className={classes.deleteAndCheckBoxActiveContainer}>
      <input name={'isActive'} className={classes.checkBoxActive} type="checkbox"
        onClick={handleTodoChanges} checked={newTodo.isActive ? true : false} />
      <div className={classes.deleteItem} onClick={handleDelete}>{'Delete'}</div>
      <input name={'name'} className={classes.updateName} type="text"
        value={newTodo.name} placeholder={"enter new name"} onChange={handleTodoChanges} />
      <select className={classes.selectCategory} value={selectCategory} onChange={pickCategory} >
        {categories.map((category, index) =>
          <option key={index} value={category}>{category}</option>
        )}
      </select>
      <div className={classes.updateChanges} onClick={changeTodo}>{'Done'}</div>
    </div>
  )
}

export default EditTodo