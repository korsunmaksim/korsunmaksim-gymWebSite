import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/auth";
import MainPage from "./pages/main";
import Shopping from "./pages/shopping";
import Trainings from "./pages/trainings";
import AddProduct from "./components/add-product";
import UserInfo from "./components/user-info";

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/info" element={<UserInfo />} />
      <Route path="/trainings/" element={<Trainings />} />
      <Route path="/shopping/" element={<Shopping />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};
