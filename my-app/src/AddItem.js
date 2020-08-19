import React from 'react';
const AddItem = (props) => {
	return (
		<div className="toDoManager">
			<div className="newToDo" >
				<input className="addInput" type="text" value={props.nameToAdd} onChange={props.updateToDoName} />
			</div>
			<div className="addToDoContainer" >
				<input className="addToDo" value="Add" onClick={props.addNewToDo} />
			</div>
		</div>

	)
}
export default AddItem 