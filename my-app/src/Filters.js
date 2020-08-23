import React from 'react';
import './Filters.css';
// rename class names
const Filters = (props) => {
	const { handleChangedCategory, updateSearchedName, searchedCategory, CategoryOptions } = props

	const pickCategory = (event) => {
		handleChangedCategory(event.target.value)
	}
	const changeSearchedName = (event) => {
		const searchedName = event.target.value
		updateSearchedName(searchedName)
	}

	return (
		<div className="filtersContainer">
			<select className="selectCategory" value={searchedCategory} onChange={pickCategory} >
				{CategoryOptions.map((Category, index) =>
					<option key={index} value={Category}>{Category}</option>
				)}
			</select>
			<div className="searchedNameContainer">
				<input
					className="searchedName"
					type="text"
					value={props.searchedName} onChange={changeSearchedName} placeholder="Search by name!" />
			</div>
		</div>
	)
}

export default Filters
