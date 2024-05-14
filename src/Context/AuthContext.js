import { createContext } from "react";

export let authContext = createContext(0);

export default function AuthContextProvider({ children }) {
  return <authContext.Provider value={{}}>{children}</authContext.Provider>;
}
