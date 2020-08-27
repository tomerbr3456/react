import React, { useContext, } from 'react';
import './Filters.css';
import { CategoryOptionsContext } from '../GeneralFiles/StateManagment'
//import { syncStateAndLocalStorage, updateLocalStorageByState } from '../GeneralFiles/localStorageManagment'

const Filters = (props) => {
	const { handleChangeCategory, updateSearchedName, searchedCategory, searchedName } = props

	const [CategoryOptions] = useContext(CategoryOptionsContext)

	const pickCategory = (event) => {
		handleChangeCategory(event.target.value)
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
					value={searchedName}
					onChange={changeSearchedName} placeholder="Search by name!" />
			</div>
		</div>
	)
}

export default Filters
