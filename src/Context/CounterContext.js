import { createContext, useState } from "react";

export let counterContext = createContext(0);

export default function CounterContextProvider({ children }) {
  
  let [counter, setCounter] = useState(0);

  return (
    <counterContext.Provider
      value={{
        counter,
        setCounter,
      }}
    >
      {children}
    </counterContext.Provider>
  );
}
