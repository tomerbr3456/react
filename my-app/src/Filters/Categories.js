/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import CategoryView from './CategoryView'
import { CategoryContext } from '../GeneralFiles/StateManagment'
import { syncStateAndLocalStorage, updateLocalStorageByState } from '../GeneralFiles/localStorageManagment'
import AddItem from '../Header/AddItem';
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

  const [Categories, SetCategory] = useContext(CategoryContext)

  const addNewCategory = (categoryToAdd) => {
    const newCategory = [...Categories, categoryToAdd]
    SetCategory(newCategory)
    updateLocalStorageByState({ Categories: newCategory })
  }

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditButton = () => {
    setIsEditMode(!isEditMode)
  }

  const updateCategoryName = (categoryEditInput, Category) => {
    let newCategory = []
    newCategory = Categories.map((currentCategory) => {
      if (currentCategory === Category) {
        return categoryEditInput
      }
      return currentCategory
    })
    SetCategory(newCategory)
    updateLocalStorageByState({ Categories: newCategory })
    handleEditButton()
  }

  const deleteCategory = (Category) => {
    let newCategory = []
    newCategory = Categories.filter((currentCategory) => {
      if (currentCategory !== Category) {
        return currentCategory
      }
      return ''
    });
    SetCategory(newCategory)
    updateLocalStorageByState({ Categories: newCategory })
  }
  useEffect(() => {
    const localStorageValues = syncStateAndLocalStorage({ Categories: INITIAL_CATEGORY_INPUT })
    SetCategory(localStorageValues.Categories)
  }, [SetCategory])

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
          Categories.map((Category, index) => (
            <CategoryView
              handleEditButton={handleEditButton}
              isEditMode={isEditMode}
              updateCategoryName={updateCategoryName}
              deleteCategory={deleteCategory}
              key={Category}
              Category={Category}
              index={index}
            />
          ))
        }
      </div>
    </div >
  )
}
export default Categories
