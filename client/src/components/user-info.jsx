import { Button } from "bootstrap-react";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import { useAuthContext } from "../context/auth.context";
import useHttp from "../hooks/useHttp.hook";

const USER_URL = "http://localhost:5000/auth/info/";
const url = "http://localhost:5000/auth";

function UserInfo() {
  const { request } = useHttp();
  const { userId } = useAuthContext();

  const [currentUser, setCurrentUser] = useState({});

  const changeHandler = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const getInfo = async function () {
    try {
      const data = await request(USER_URL, "Cannot get user!", "POST", {
        id: userId,
      });
      setCurrentUser(data);
      console.log(currentUser);
    } catch (e) {
      console.log(e.message);
      console.log(userId);
    }
  };

  const updateInfo = async function () {
    try {
      await request(url, "Cannot get user!", "PATCH", {
        id: userId,
        name: currentUser.name,
        surname: currentUser.surname,
        email: currentUser.email,
        age: currentUser.age,
        avatarUrl: currentUser.avatarUrl,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <form onSubmit={sumbitHandler}>
      <div className="container">
        <Card
          className="mx-auto "
          style={{
            height: "400px",
            width: "600px",
            top: "100px",
          }}
        >
          <Card.Body className="d-flex flex-column">
            <h1 style={{ textAlign: "center" }}>Your profile</h1>
            <input
              value={currentUser.name}
              className="mt-1"
              placeholder="Enter name"
              type="text"
              name="name"
              onChange={changeHandler}
            />
            <input
              value={currentUser.surname}
              className="mt-1"
              placeholder="Enter surname"
              type="text"
              name="surname"
              onChange={changeHandler}
            />
            <input
              value={currentUser.email}
              className="mt-1"
              placeholder="Enter email"
              type="text"
              name="email"
              onChange={changeHandler}
            />
            <input
              value={currentUser.age}
              className="mt-1"
              placeholder="Enter age"
              type="text"
              name="age"
              onChange={changeHandler}
            />
          </Card.Body>
          <Button
            style={{
              position: "absolute",
              bottom: "20px",
              left: "220px",
              fontSize: "20px",
            }}
            onClick={updateInfo}
          >
            Save changes
          </Button>
        </Card>
      </div>
    </form>
  );
}

export default UserInfo;
