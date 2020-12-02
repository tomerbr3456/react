import React, { useState, createContext, } from 'react';
export const CategoryContext = createContext()

const INITIAL_CATEGORY = ['sport'];

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState(INITIAL_CATEGORY)

  return (
    <CategoryContext.Provider value={[categories, setCategories]}>
      {props.children}
    </CategoryContext.Provider>
  )
}

