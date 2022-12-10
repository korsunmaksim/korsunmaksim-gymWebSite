import { useState } from "react";

function useUserMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  function closeMenu() {
    setIsOpenMenu(false);
  }
  function openMenu() {
    setIsOpenMenu(true);
  }
  return { isOpenMenu, openMenu, closeMenu };
}

export default useUserMenu;
