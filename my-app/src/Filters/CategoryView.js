import React, { useState } from 'react';
import PropTypes from 'prop-types'
import EditCategory from './EditCategory';
import ReadOnlyCategories from './ReadOnlyCategories'
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
  "categoriesList": {
    "width": "100%",
    "height": "150px"
  }
})


// נתת שם של קומפוננטה תצוגתית בפועל היא הרבה יותר מזה
// תפרק לפקומפוננטות ותקרא על container vs component react
const CategoryView = (props) => {
  const { category, index, deleteCategory, updateCategoryName, handleEditButton, isEditMode } = props
  CategoryView.propTypes = {
    category: PropTypes.string.isRequired, index: PropTypes.number.isRequired,
  }
  // 

  const useDeleteCategory = () => {
    deleteCategory(category)
  }

  const changeEditMode = () => {
    handleEditButton()
  }

  const [categoryEditInput, setCategoryEditInput] = useState('')

  const handleEditCategoryName = () => {
    updateCategoryName(categoryEditInput, category)

  }

  const handleCategoryChanges = (event) => {
    setCategoryEditInput(event.target.value)
  }
  const classes = useStyles()
  return (
    <div key={index} className={classes.categoriesList}>
      {isEditMode
        ? (
          <EditCategory
            categoryEditInput={categoryEditInput}
            handleCategoryChanges={handleCategoryChanges}
            updateCategoryName={handleEditCategoryName}
          />
        ) : (
          <ReadOnlyCategories
            category={category}
            changeEditMode={changeEditMode}
            deleteCategory={useDeleteCategory}
          />
        )}
    </div>
  )
}

export default CategoryView
