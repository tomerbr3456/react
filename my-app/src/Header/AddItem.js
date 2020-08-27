import React, { useState, useEffect, useContext } from 'react';
import './AddItem.css';
import { syncStateAndLocalStorage, updateLocalStorageByState } from '../GeneralFiles/localStorageManagment'
import { TodoListContext } from '../GeneralFiles/StateManagment'

const AddItem = () => {
	const [todoList, setTodoList] = useContext(TodoListContext)
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
			let newToDo = {
				id: todoList[todoList.length - 1].id + 1,
				name: nameToAdd, isActive: false, Category: ''
			}
			setTodoList([...todoList, newToDo])
			setNameToAdd("")
		}
	}

	return (
		<div className="toDoManager">
			<div className="newToDo" >
				<input className="addInput" type="text" value={nameToAdd} onChange={handleAddNewName} />
			</div>
			<div className="addToDoContainer" >
				<div className="addToDo" onClick={addNewToDo} >Add</div>
			</div>
		</div>

	)
}
export default AddItem 