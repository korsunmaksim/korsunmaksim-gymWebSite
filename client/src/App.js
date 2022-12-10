import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRoutes } from "./routes";
import { Navbar } from "./components/navbar";
import "./styles/app.css";
import useShopping from "./hooks/useShopping.hook";
import useUserMenu from "./hooks/useUserMenu.hook";
import { ShoppingContext } from "./context/shopping-context";
import { UserMenuContext } from "./context/user-menu-context";
import useAuth from "./hooks/useAuth.hook";
import { AuthContext } from "./context/auth.context";
import useTrainings from "./hooks/useTrainings.hook";
import { TrainingContext } from "./context/trainings.context";

function App() {
  const shopping = useShopping();
  const userMenu = useUserMenu();
  const auth = useAuth();
  const routes = useRoutes();
  const trainings = useTrainings();
  return (
    <AuthContext.Provider value={auth}>
      <ShoppingContext.Provider value={shopping}>
        <TrainingContext.Provider value={trainings}>
          <UserMenuContext.Provider value={userMenu}>
            <Navbar />
            {routes}
          </UserMenuContext.Provider>
        </TrainingContext.Provider>
      </ShoppingContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
