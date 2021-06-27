import React, { useState, createContext } from "react"

export const ChangeKeyBoardContext = createContext();

export const ChangeKeyBoardProvider = props => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <ChangeKeyBoardContext.Provider value={[selectedOption, setSelectedOption]}>
      {props.children}
    </ChangeKeyBoardContext.Provider>
  );
};