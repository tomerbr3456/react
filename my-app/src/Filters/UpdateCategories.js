import React, { useContext, useState, useEffect } from 'react';
import './AddCategory.css';
import AddCategory from './AddCategory'
import CategoryView from './CategoryView'
import { CategoryOptionsContext } from '../GeneralFiles/StateManagment'
import { syncStateAndLocalStorage, updateLocalStorageByState } from '../GeneralFiles/localStorageManagment'

const UpdateCategories = (props) => {
  const INITIAL_CATEGORY_INPUT = ''
  const [CategoryOptions, SetCategoryOptions] = useContext(CategoryOptionsContext)
  const [categoryInput, setCategoryInput] = useState(INITIAL_CATEGORY_INPUT)

  const addNewCategory = () => {
    if (categoryInput !== '') {
      const newCategoryOptions = [...CategoryOptions, categoryInput]
      SetCategoryOptions(newCategoryOptions)
      updateLocalStorageByState({ CategoryOptions: newCategoryOptions })
      setCategoryInput('')
    }
  }

  useEffect(() => {
    const localStorageValues = syncStateAndLocalStorage({ CategoryInput: INITIAL_CATEGORY_INPUT, CategoryOptions: INITIAL_CATEGORY_INPUT })
    setCategoryInput(localStorageValues.CategoryInput)
    SetCategoryOptions(localStorageValues.CategoryOptions)
  }, [INITIAL_CATEGORY_INPUT, SetCategoryOptions])

  const handleCategoryInputChange = (event) => {
    setCategoryInput(event.target.value)
    updateLocalStorageByState({ CategoryInput: event.target.value })
  }

  return (
    <div>
      <AddCategory categoryInput={categoryInput}
        handleCategoryInputChange={handleCategoryInputChange}
        addNewCategory={addNewCategory} />
      <div className="categoriesContainer">
        {CategoryOptions.map((Category, index) =>
          <CategoryView key={index}
            Category={Category}
            index={index} />
        )
        }

      </div>
    </div>
  )
}
export default UpdateCategories