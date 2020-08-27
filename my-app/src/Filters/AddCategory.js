import React from 'react';
import './AddCategory.css';
import { Link } from 'react-router-dom'

const AddCategory = (props) => {
  const { categoryInput, handleCategoryInputChange, addNewCategory } = props
  return (
    <div>
      <div className="addCategoryInputContainer">
        <Link className="homePage" to='/'> {'Home'} </Link>
        <div className="InputAndAddContainer">
          <input name={'category'} className={"addCategoryInput"} type="text"
            value={categoryInput} placeholder={"enter new category"} onChange={handleCategoryInputChange} />
          <div to='/' className="addCategoryButton" onClick={addNewCategory}>add</div>
        </div>
        <div className="takePlace"></div>
      </div>
    </div>
  )
}
export default AddCategory