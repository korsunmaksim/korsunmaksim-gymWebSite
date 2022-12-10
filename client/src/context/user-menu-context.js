import { createContext, useContext, useState } from "react";

const UserMenuContext = createContext();

function useUserMenuContext() {
  return useContext(UserMenuContext);
}

export { UserMenuContext, useUserMenuContext };
