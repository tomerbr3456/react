import React, { useState, useEffect } from 'react';
import './AddItem.css';
import { syncStateAndLocalStorage, updateLocalStorageByState } from './MainList'

const AddItem = (props) => {
	const { addNewItem } = props

	const [nameToAdd, setNameToAdd] = useState('');

	const handleAddNewName = (event) => {
		setNameToAdd(event.target.value)
		updateLocalStorageByState({ nameToAdd: event.target.value })
	}

	useEffect(() => {
		const localStorageValues = syncStateAndLocalStorage({ nameToAdd })
		setNameToAdd(localStorageValues.nameToAdd)
	}, [])

	const addNewToDo = () => {
		if (nameToAdd != "") {
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