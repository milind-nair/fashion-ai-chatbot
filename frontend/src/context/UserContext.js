import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("User1");

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
