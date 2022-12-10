import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthContext } from "../context/auth.context";

function MainPage() {
  const { userRole } = useAuthContext();
  const [clientsAmount, setClientsAmount] = useState(0);
  const [newestAmount, setNewestAmount] = useState(0);

  const clientsAmountHandler = (e) => {
    setNewestAmount(e.target.value);
  };
  return (
    <>
      <div
        style={{
          color: "white",
          position: "absolute",
          right: "450px",
          top: "130px",
          width: "500px",
          height: "300px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>La-Flame Gym</h1>
        <h2 style={{ textAlign: "center", fontSize: "25px" }}>
          Welcome to our gym website.Here you can see all our trainings from
          professional trainers and visit our shop where you can buy the best
          suplements for faster muscles grow and recovery
        </h2>
      </div>
      {(userRole === "Admin" || userRole === "Worker") && (
        <div>
          {" "}
          <input
            style={{ position: "absolute", right: "50px", bottom: "120px" }}
            className="mt-1"
            placeholder="Enter newest amount"
            name="password"
            onChange={clientsAmountHandler}
          />
          <Button
            style={{ position: "absolute", right: "80px", bottom: "70px" }}
            onClick={() => {
              setClientsAmount(newestAmount);
            }}
          >
            Submit amount
          </Button>
        </div>
      )}
      <div
        style={{
          color: "white",
          position: "absolute",
          right: "10px",
          bottom: "10px",
          background: "yellow",
          color: "black",
          padding: "10px",
          fontSize: "20px",
          borderRadius: "20px",
        }}
      >
        Clients in the gym right now: {clientsAmount}
      </div>
    </>
  );
}

export default MainPage;
