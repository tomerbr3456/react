import React from 'react';
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  "editContainer": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "width": "100%",
    "height": "100%",
    "alignItems": "center",
    "textAlign": "center"
  },
  "categoryViewContainer": {
    "display": "flex",
    "justifyContent": "space-around",
    "alignItems": "center",
    "textAlign": "center",
    "fontSize": "50px",
    "width": "50%",
    "height": "90%",
    "border": "1px solid black",
    "borderRadius": "4px",
    "backgroundColor": "greenyellow"
  },
  "deleteCategoryButton": {
    "fontSize": "20px",
    "width": "20%",
    "height": "50%",
    "backgroundColor": "cornflowerblue",
    "border": "1px solid black",
    "borderRadius": "4px",
    "boxSizing": "border-box"
  },
  "editCategory": {
    "fontSize": "20px",
    "width": "20%",
    " height": "50%",
    "backgroundColor": "cornflowerblue",
    "border": "1px solid black",
    "borderRadius": "4px",
    "boxSizing": "border-box"
  },
  "categoryView": {
    "fontSize": "20px",
    "width": "50%",
    " height": "50%",
    "border": "1px solid black",
    "borderRadius": "4px",
    "backgroundColor": "steelblue"
  }
})

const ReadOnlyCategory = (props) => {
  const { category, changeEditMode, deleteCategory } = props
  ReadOnlyCategory.propTypes = {
    category: PropTypes.string.isRequired,
    handleEditButton: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
  }
  const classes = useStyles()
  return (
    <div className={classes.editContainer}>
      <div className={classes.categoryViewContainer}>
        <button className={classes.deleteCategoryButton} value={category} onClick={deleteCategory}>Delete</button>
        <button className={classes.editCategory} onClick={changeEditMode}>Edit</button>
        <button className={classes.categoryView}>{category}</button>
      </div>
    </div>
  )
}
export default ReadOnlyCategory
