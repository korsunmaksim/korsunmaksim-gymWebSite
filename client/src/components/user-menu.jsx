import { useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useAuthContext } from "../context/auth.context";
import { useMainContext } from "../context/shopping-context";
import { useUserMenuContext } from "../context/user-menu-context";

export function UserMenu() {
  const { userRole } = useAuthContext();
  const { isOpenMenu, closeMenu } = useUserMenuContext();
  const { logout } = useAuthContext();
  return (
    <Offcanvas show={isOpenMenu} onHide={closeMenu} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {userRole === "Client" && (
          <Button
            className="w-100"
            style={{ marginBottom: "20px" }}
            href="/info"
          >
            Info
          </Button>
        )}
        <Button
          className="w-100"
          style={{ width: "100" }}
          href="/"
          onClick={logout}
        >
          Log out
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
