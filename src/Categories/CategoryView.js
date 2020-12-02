import React, { useState } from 'react';
import PropTypes from 'prop-types'
import EditCategory from './EditCategory';
import ReadOnlyCategory from './ReadOnlyCategory'
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
  "categoriesList": {
    "width": "100%",
    "height": "150px"
  }
})

const CategoryView = (props) => {
  const { category, index, deleteCategory, updateCategoryName } = props

  const useDeleteCategory = () => {
    deleteCategory(category)
  }

  const changeEditMode = () => {
    handleEditButton()
  }

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditButton = () => {
    setIsEditMode(!isEditMode)
  }

  const [categoryEditInput, setCategoryEditInput] = useState(category)

  const handleEditCategoryName = () => {
    if (categoryEditInput !== '') {
      updateCategoryName(categoryEditInput, category)
      setCategoryEditInput(category)
      handleEditButton()
    }

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
          <ReadOnlyCategory
            category={category}
            changeEditMode={changeEditMode}
            deleteCategory={useDeleteCategory}
          />
        )}
    </div>
  )
}

CategoryView.propTypes = {
  category: PropTypes.string.isRequired, index: PropTypes.number.isRequired,
}

export default CategoryView
