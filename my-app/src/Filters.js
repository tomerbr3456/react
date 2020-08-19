import React from 'react';
// rename class names
const Filters = (props) => {
	return (
		<div className="filtersContainer">
			<select className="selectCategory" value={props.searchedCategory} onChange={props.pickCategory} >
				{props.CategoryOptions.map((Category, index) =>
					<option key={index} value={Category}>{Category}</option>
				)}
			</select>
			<div className="searchedNameContainer">
				<input
					className="searchedName"
					type="text"
					value={props.searchedName} onChange={props.updateSearchBar} placeholder="Search by name!" />
			</div>
		</div>
	)
}

export default Filters