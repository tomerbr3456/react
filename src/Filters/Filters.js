import React, { useContext, useMemo, } from 'react';
import { CategoryContext } from '../StateManagment/CategoryContext'
import { createUseStyles } from 'react-jss'
import { allFilter } from './FilterConstants'

const useStyles = createUseStyles({
	"filtersContainer": {
		"display": "flex",
		"justifyContent": "center",
		"textAlign": "center",
		"alignItems": "center"
	},
	"selectCategory": {
		"backgroundColor": "DodgerBlue",
		"height": "55px",
		"width": "70px"
	},
	"searchedNameContainer": {
		"display": "flex",
		"justifyContent": "center",
		"alignContent": "center",
		"textAlign": "center"
	},
	"searchedName": {
		"textAlign": "center",
		"height": "50px",
		"justifyContent": "space-between",
		"alignContent": "center"
	}
})

const Filters = (props) => {
	const { handleChangeCategory, updateSearchedName, searchedCategory, searchedName } = props

	const [categories] = useContext(CategoryContext)

	const categoriesFilterOptions = useMemo(() => {
		return [...categories, allFilter]
	}, [categories])

	const pickCategory = (event) => {
		handleChangeCategory(event.target.value)
	}

	const changeSearchedName = (event) => {
		const searchedName = event.target.value
		updateSearchedName(searchedName)
	}
	const classes = useStyles()

	return (
		<div className={classes.filtersContainer}>
			<select className={classes.selectCategory} value={searchedCategory} onChange={pickCategory} >
				{categoriesFilterOptions.map((category, index) =>
					<option key={index} value={null}>{category}</option>
				)}
			</select>
			<div className={classes.searchedNameContainer}>
				<input
					className={classes.searchedName}
					type="text"
					value={searchedName}
					onChange={changeSearchedName} placeholder="Search by name!" />
			</div>
		</div>
	)
}

export default Filters
