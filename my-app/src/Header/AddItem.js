import React, { useState, useEffect } from 'react';
import './AddItem.css';
import { syncStateAndLocalStorage, updateLocalStorageByState } from '../GeneralFiles/localStorageManagment'

const AddItem = (props) => {
	const { addNewItem } = props
	const initialNameToAdd = ''
	const [nameToAdd, setNameToAdd] = useState(initialNameToAdd);

	const handleAddNewName = (event) => {
		setNameToAdd(event.target.value)
		updateLocalStorageByState({ nameToAdd: event.target.value })
	}

	useEffect(() => {
		const localStorageValues = syncStateAndLocalStorage({ nameToAdd: initialNameToAdd })
		setNameToAdd(localStorageValues.nameToAdd)
	}, [initialNameToAdd])

	const addNewToDo = () => {
		if (nameToAdd !== "") {
			addNewItem(nameToAdd)
			setNameToAdd("")
		}
	}

	return (
		<div className="toDoManager">
			<div className="newToDo" >
				<input className="addInput" type="text" value={nameToAdd} onChange={handleAddNewName} />
			</div>
			<div className="addToDoContainer" >
				<input className="addToDo" value="Add" onClick={addNewToDo} />
			</div>
		</div>

	)
}
export default AddItem 