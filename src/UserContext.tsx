import React, { useContext } from "react";
import { UserContextType } from "./types";

const UserContext = React.createContext<UserContextType | undefined>(undefined);

type UserContextProviderProps = {
  children: React.ReactNode;
  value: UserContextType;
};

// wrap our app with this component so any child components can consume the global data
export function UserContextProvider(props: UserContextProviderProps) {
  return (
    <UserContext.Provider value={props.value}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext)
    throw new Error("user context must be wrapped in UserContextProvider.");
  return userContext;
}
