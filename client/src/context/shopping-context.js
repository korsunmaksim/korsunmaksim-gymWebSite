import { createContext, useContext } from "react";

const ShoppingContext = createContext();

function useShoppingContext() {
  return useContext(ShoppingContext);
}

export { ShoppingContext, useShoppingContext };
