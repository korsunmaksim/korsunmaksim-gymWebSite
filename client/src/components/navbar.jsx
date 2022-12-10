import { Navbar as NavbarBS, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { UserMenu } from "./user-menu";
import { useUserMenuContext } from "../context/user-menu-context";
import { useAuthContext } from "../context/auth.context";

export function Navbar() {
  const { isAuthenticated } = useAuthContext();
  const { openMenu } = useUserMenuContext();
  return (
    <>
      <NavbarBS sticky="top" className="bg-dark  mb-3 ">
        <div
          style={{
            color: "white",
            position: "absolute",
            fontSize: "40px",
            left: "30px",
            bottom: "5px",
          }}
        >
          <CgGym />
        </div>
        <Container>
          <Nav
            className="navbar navbar-dark pb-0 pt-0"
            style={{ fontSize: 20 }}
          >
            <Nav.Link to={"/"} as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to={"/trainings"} as={NavLink}>
              Trainings
            </Nav.Link>
            <Nav.Link to={"/shopping"} as={NavLink}>
              Our shop
            </Nav.Link>
          </Nav>
          {isAuthenticated && (
            <Button
              style={{
                background: "cyan",
                color: "black",
                position: "absolute",
                right: "30px",
              }}
              onClick={openMenu}
            >
              <FaUser />
            </Button>
          )}
          {!isAuthenticated && (
            <Button
              style={{
                background: "cyan",
                color: "black",
                position: "absolute",
                right: "30px",
              }}
              href="/auth"
            >
              Log in
            </Button>
          )}
        </Container>
      </NavbarBS>
      <UserMenu />
    </>
  );
}
