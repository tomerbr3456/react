import React, { useState, createContext, } from 'react';
export const FilteredTodosContext = createContext()

const INITIAL_FILTERED_TODOS = [{}];

export const FilteredTodosProvider = (props) => {
  const [filteredTodos, setFilteredTodos] = useState(INITIAL_FILTERED_TODOS)

  return (
    <FilteredTodosContext.Provider value={[filteredTodos, setFilteredTodos]}>
      {props.children}
    </FilteredTodosContext.Provider>
  )
}