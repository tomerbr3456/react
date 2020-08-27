import React, { useContext, useState, } from 'react';
import './AddCategory.css';
import { CategoryOptionsContext } from '../GeneralFiles/StateManagment'
import { updateLocalStorageByState } from '../GeneralFiles/localStorageManagment'

const CategoryView = (props) => {
  const { Category, index } = props
  const [CategoryOptions, SetCategoryOptions] = useContext(CategoryOptionsContext)
  const [isEditMode, setIsEditMode] = useState(false);

  const deleteCategory = (event) => {
    let newCategoryOptions = []
    newCategoryOptions = CategoryOptions.filter(currentCategory => {
      if (currentCategory !== Category)
        return currentCategory
      return ''
    });
    SetCategoryOptions(newCategoryOptions)
    updateLocalStorageByState({ CategoryOptions: newCategoryOptions })
    event.stopPropagation()
  }
  const updateCategoryName = () => {
    let newCategoryOptions = []
    newCategoryOptions = CategoryOptions.map(currentCategory => {
      if (currentCategory === Category)
        return categoryEditInput
      return currentCategory
    })
    SetCategoryOptions(newCategoryOptions)
    updateLocalStorageByState({ CategoryOptions: newCategoryOptions })
    handleEditButton()
  }

  const [categoryEditInput, setCategoryEditInput] = useState('')

  const handleCategoryChanges = (event) => {
    setCategoryEditInput(event.target.value)
  }

  const handleEditButton = () => {
    setIsEditMode(!isEditMode)
  }
  return (
    <div key={index} className="categoriesList">
      {isEditMode
        ?
        <div className="editContainer">
          <div className="categoryViewContainer">
            <input name={'name'} className={"updateCategory"} type="text"
              value={categoryEditInput} placeholder={"enter new category"} onChange={handleCategoryChanges} />
            <div className="done" onClick={updateCategoryName}>Done</div>
          </div>
        </div>
        :
        <div className="editContainer">
          <div className="categoryViewContainer">
            <button className="deleteCategoryButton" value={Category} onClick={deleteCategory}>{'Delete'}</button>
            <div className="editCategory" onClick={handleEditButton}>{'Edit'}</div>
            <div className="categoryView">{Category}</div>
          </div>
        </div>
      }
    </div>
  )
}

export default CategoryView
