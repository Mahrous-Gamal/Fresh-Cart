import { createContext } from "react";

export let AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
