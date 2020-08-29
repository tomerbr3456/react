/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'
import './AddCategory.css'
import { Link } from 'react-router-dom'

const AddCategory = (props) => {
  const { category, handleCategoryInputChange, addNewCategory } = props
  // תגדיר את זה מחוץ לקומפוננטה
  return (
    <div>
      <div className="addCategoryInputContainer">
        {/* לינק לא שייך לקובץ הזה */}
        <Link className="homePage" to="/"> Home </Link>
        <div className="InputAndAddContainer">
          <input
            name="category"
            className="addCategoryInput"
            type="text"
            value={category}
            placeholder="enter new category"
            onChange={handleCategoryInputChange}
          />
          <div className="addCategoryButton" onClick={addNewCategory}>add</div>
        </div>
        {/*  */}
        <div className="takePlace" />
      </div>
    </div>
  )
}

AddCategory.propTypes = {
  category: PropTypes.string.isRequired,
  handleCategoryInputChange: PropTypes.func.isRequired,
  addNewCategory: PropTypes.func.isRequired,
}
export default AddCategory
