import React, { useContext, useEffect } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import Todos from './Todos'
import arrayMove from 'array-move';
import { TodoListContext } from '../StateManagment/TodoListState'
const SortableTodoContainer = (props) => {
  const [todoList, setTodoList] = useContext(TodoListContext)
  const { toggleActive, deleteToDo, updateTodo, handleDelete, sortTodosByIndex } = props

  const SortableList = SortableContainer(() => {
    console.log('filterArr', todoList)
    return (
      <Todos
        toggleActive={toggleActive}
        onSortEnd={onSortEnd}
        deleteToDo={deleteToDo}
        updateTodo={updateTodo}
        handleDelete={handleDelete}
      />
    );
  }
  )

  useEffect(() => {
    sortTodosByIndex()
  }, [todoList, sortTodosByIndex]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex)
    let newList = arrayMove(todoList, oldIndex, newIndex)
    console.log('newList', newList)
    newList = newList.map((currentTodo, index) => ({ ...currentTodo, sortIndex: index }))
    setTodoList(newList)
  }

  return (<SortableList onSortEnd={onSortEnd} />)
}
export default SortableTodoContainer
