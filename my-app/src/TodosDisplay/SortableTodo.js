import React from 'react';
import PropTypes from 'prop-types'
import Todo from './Todo'
import { SortableElement } from 'react-sortable-hoc';

const SortableTodo = (props) => {
  const { index, todo, updateTodo, handleDelete } = props

  const SortableItem = SortableElement(() => (
    <Todo
      updateTodo={updateTodo}
      todo={todo}
      index={index}
      handleDelete={handleDelete}
    />
  ));
  return (<SortableItem index={index} />)
}
Todo.propTypes = {
  todo: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  updateTodo: PropTypes.func.isRequired,
}

export default SortableTodo
