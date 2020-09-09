import React, { useContext } from 'react';
import SortableTodo from './SortableTodo'
import { createUseStyles } from 'react-jss'
import { TodoListContext } from '../StateManagment/TodoListState'

const TodosStyle = createUseStyles({
  listContainer: {
    display: 'flex',
    wrap: 'nowrap',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: ' center',
  },
  takePlace: {
    width: '10%'
  },
  listOfToDos: {
    'font-size': '30px',
    width: '49%',
    fontSize: '30px',
    maxHeight: '300px',
    overflowY: 'auto',
    overflowX: 'hidden',
  }
})

const Todos = (props) => {
  const [todoList] = useContext(TodoListContext)
  const { toggleActive, deleteToDo, updateTodo, handleDelete } = props

  const classes = TodosStyle()

  return (
    <div className={classes.listContainer}>
      <div className={classes.listOfToDos}>
        {todoList.map((todo, index) => (
          <SortableTodo
            key={`todo-${todo.id}`}
            index={index}
            updateTodo={updateTodo}
            todo={todo}
            deleteToDo={deleteToDo}
            toggleActive={toggleActive}
            handleDelete={handleDelete} />
        ))}

      </div>
    </div>
  )
}
export default Todos