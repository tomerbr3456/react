import React, { useState, createContext, } from 'react';
export const CategoryContext = createContext()

const INITIAL_CATEGORY = ["sports", "friends", "study", "all"];

export const CategoryProvider = (props) => {
  const [Categories, setCategory] = useState(INITIAL_CATEGORY)

  return (
    <CategoryContext.Provider value={[Categories, setCategory]}>
      {props.children}
    </CategoryContext.Provider>
  )
}

