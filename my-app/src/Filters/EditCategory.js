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
  "updateCategory": {
    "width": "30%",
    "height": "50%",
    "fontSize": "20px",
    "border": "1px solid #ccc",
    "borderRadius": "4px",
    "boxSizing": "border-box"
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

})

const EditCategory = (props) => {
  const { categoryEditInput, handleCategoryChanges, updateCategoryName } = props
  EditCategory.propTypes = {
    categoryEditInput: PropTypes.string.isRequired,
    handleCategoryChanges: PropTypes.func.isRequired,
    updateCategoryName: PropTypes.func.isRequired,
  }
  const classes = useStyles()
  return (
    <div className={classes.editContainer}>
      <div className={classes.categoryViewContainer}>
        <input
          name="name"
          className={classes.updateCategory}
          type="text"
          value={categoryEditInput}
          placeholder="enter new category"
          onChange={handleCategoryChanges}
        />
        <div className="done" role="button" onClick={updateCategoryName}>Done</div>
      </div>
    </div>
  )
}
export default EditCategory
