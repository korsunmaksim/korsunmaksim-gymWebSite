import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context";
import useHttp from "../hooks/useHttp.hook";

const LOGIN_URL = "http://localhost:5000/auth/login";
const SIGNUP_URL = "http://localhost:5000/auth/signup";

function AuthPage() {
  const { login, isAuthenticated } = useAuthContext();
  const { request, loading, error, clearError } = useHttp();
  const [info, setInfo] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const signupHandler = async () => {
    clearError();
    try {
      await request(SIGNUP_URL, "Wrong e-mail or password!", "POST", {
        ...info,
      });
    } catch (e) {}
  };

  const loginHandler = async () => {
    clearError();
    try {
      const data = await request(
        LOGIN_URL,
        "Wrong e-mail or password!",
        "POST",
        { ...info }
      );
      login(data.token, data.userId, data.role);
    } catch (e) {}
  };

  return (
    <>
      {isAuthenticated && <Navigate to="/" />}
      <Card
        className="mx-auto "
        style={{
          height: "230px",
          width: "600px",
          top: "100px",
        }}
      >
        <Card.Body className="d-flex flex-column">
          <h1 style={{ textAlign: "center" }}>Gym name</h1>
          <input
            className="mt-1"
            placeholder="Enter email"
            type="text"
            name="email"
            onChange={changeHandler}
          />
          <input
            className="mt-1"
            placeholder="Enter password"
            type="password"
            name="password"
            onChange={changeHandler}
          />
          <div className="text-danger">{error}</div>
          <div className="mx-auto">
            <Button className="m-2" onClick={loginHandler} disabled={loading}>
              Log in
            </Button>
            <Button className="m-2" onClick={signupHandler} disabled={loading}>
              Sign up
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default AuthPage;
