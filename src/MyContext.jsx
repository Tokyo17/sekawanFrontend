import React, { createContext, useState } from 'react';

// Create a Context
const MyContext = createContext();

// Create a Provider component
const MyProvider = ({ children }) => {
  const [state, setState] = useState(true);

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
