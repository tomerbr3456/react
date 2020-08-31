/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import CategoryView from './CategoryView'
import { CategoryContext } from '../StateManagment/CategoriesState'
import { TodoListContext } from '../StateManagment/TodoListState'
import { syncStateAndLocalStorage, updateLocalStorageByState } from '../LocalStorage/localStorageManagment'
import AddItem from '../TodosDisplay/AddItem';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  "categoryManager": {
    "textAlign": "center",
    "height": "120px"
  },
  "homePage": {
    "fontSize": "20px",
    "width": "4%",
    "height": "100%",
    "backgroundColor": "cornflowerblue",
    "display": "inline-block",
    "border": "1px solid black",
    "borderRadius": "4px",
    "boxSizing": "border-box"
  },
  "categoriesContainer": {
    "maxHeight": "300px",
    "overflowY": "auto",
    "overflowX": "hidden",
    "width": "100%"
  }
})


const INITIAL_CATEGORY_INPUT = ['sports']
const Categories = () => {

  // סט ברבים תרשום
  const [categories, setCategories] = useContext(CategoryContext)

  const addNewCategory = (categoryToAdd) => {
    const newCategories = [...categories, categoryToAdd]
    setCategories(newCategories)
    // 
    updateLocalStorageByState({ categories: newCategories })
  }

  const [todoList, setTodoList] = useContext(TodoListContext)

  const updateTodoByCategory = (currentCategory, newCategory) => {
    let newTodos = [{}]
    newTodos = todoList.map((currentTodo) => {
      if (currentTodo.category === currentCategory) {
        return {
          ...currentTodo,
          category: newCategory
        }
      }
      return currentTodo
    })
    setTodoList(newTodos)
  }

  const updateTodosByDeleteCategory = (category) => {
    let newTodos = [{}]
    newTodos = todoList.filter((currentTodo) => {
      if (currentTodo.category === category) {
        return false
      }
      return true
    })
    setTodoList(newTodos)
  }

  const updateCategoryName = (categoryEditInput, category) => {
    let newCategories = []
    newCategories = categories.map((currentCategory) => {
      if (currentCategory === category) {
        return categoryEditInput
      }
      return currentCategory
    })
    updateTodoByCategory(category, categoryEditInput)
    setCategories(newCategories)
    updateLocalStorageByState({ categories: newCategories })
  }

  const deleteCategory = (category) => {
    let newCategory = []
    newCategory = categories.filter((currentCategory) => {
      if (currentCategory !== category) {
        return true
      }
      return false
    });
    setCategories(newCategory)
    updateLocalStorageByState({ categories: newCategory })
    updateTodosByDeleteCategory(category)
  }

  useEffect(() => {
    const mainListState = { todoList }
    updateLocalStorageByState(mainListState)
  }, [todoList]);

  useEffect(() => {
    const localStorageValues = syncStateAndLocalStorage({ categories: INITIAL_CATEGORY_INPUT })
    setCategories(localStorageValues.categories)
  }, [setCategories])

  const classes = useStyles()
  return (
    < div >
      <h1 className={classes.categoryManager}>Category Manager</h1>
      <Link className={classes.homePage} to="/"> Home </Link>
      <AddItem
        addNewItem={addNewCategory}
      />
      <div className={classes.categoriesContainer}>
        {
          categories.map((category, index) => (
            <CategoryView
              updateCategoryName={updateCategoryName}
              deleteCategory={deleteCategory}
              key={category}
              category={category}
              index={index}
            />
          ))
        }
      </div>
    </div >
  )
}
export default Categories
