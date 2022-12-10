import React from "react";
import Training from "../components/training";
import { useAuthContext } from "../context/auth.context";
import { useTrainingContext } from "../context/trainings.context";

function Trainings() {
  const { trainings } = useTrainingContext();
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) {
    return (
      <div
        style={{
          color: "white",
          fontSize: "70px",
          position: "absolute",
          left: "300px",
          top: "100px",
        }}
      >
        Authorize for more information
      </div>
    );
  }
  return (
    <>
      <h2
        style={{
          position: "absolute",
          color: "white",
          width: "550px",
          height: "250px",
          fontFamily: "serif",
          fontSize: "40px",
          textAlign: "center",
          left: "40px",
          background: "black",
          borderRadius: "20px",
          borderColor: "blue",
        }}
      >
        Here you can see all our training and eating programs.These program may
        help you to get in the best shape that you've ever been in
      </h2>
      <div style={{ position: "absolute", right: "200px" }}>
        {trainings.map((item) => (
          <div key={item._id}>
            <Training {...item} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Trainings;
