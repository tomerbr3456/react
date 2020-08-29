import React, { useState, createContext, } from 'react';
export const CategoryContext = createContext()

// initial


// זה לא כבר לא שייך דווקא לmainlist
// initialize -> initial
const INITIAL_CATEGORY = ["sports", "friends", "study", "all"];

// remove Options
export const CategoryProvider = (props) => {
  const [Categories, setCategory] = useState(INITIAL_CATEGORY)

  return (
    <CategoryContext.Provider value={[Categories, setCategory]}>
      {props.children}
    </CategoryContext.Provider>
  )
}

