import React, { useContext, } from 'react';
import { CategoryContext } from '../GeneralFiles/StateManagment'
import { createUseStyles } from 'react-jss'

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

	const [Categories] = useContext(CategoryContext)

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
				{Categories.map((Category, index) =>
					<option key={index} value={Category}>{Category}</option>
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
