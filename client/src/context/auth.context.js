import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthContext, useAuthContext };
