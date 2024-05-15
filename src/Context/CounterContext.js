import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider({ children }) {
  
  let [counter, setCounter] = useState(0);

  return (
    <CounterContext.Provider
      value={{
        counter,
        setCounter,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}
