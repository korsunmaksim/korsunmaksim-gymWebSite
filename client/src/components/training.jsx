import { Card, CardBody, Button } from "bootstrap-react";
import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/auth.context";
import { useTrainingContext } from "../context/trainings.context";

function Training(props) {
  const { userRole, token, userId } = useAuthContext();
  const { deleteTraining } = useTrainingContext();
  let buttonText = "Call a consultation";
  if (userRole === "Trainer" || "Admin") {
    buttonText = "Check last requests for consultation";
  }

  return (
    <Card
      className="bg-info"
      style={{
        width: "700px",
        height: "250px",
        justifyContent: "center",
        margin: "auto",
        marginBottom: "20px",
        borderRadius: "10px",
      }}
    >
      <CardBody>
        <h1 style={{ textAlign: "center" }}>{props.name}</h1>
        <h2
          style={{
            fontSize: "20px",
            textAlign: "center",
            fontStyle: "oblique",
            color: "black",
          }}
        >
          {props.description}
        </h2>
        <Button
          style={{
            backgroundColor: "black",
            position: "absolute",
            right: "10px",
          }}
          href={props.pdfUrl}
        >
          Check training out
        </Button>
        {userRole == "Admin" && (
          <Button
            style={{ background: "red", position: "relative" }}
            onClick={() => deleteTraining(props._id)}
          >
            Delete program
          </Button>
        )}
        <Button
          style={{
            backgroundColor: "black",
            position: "relative",
            marginLeft: "80px",
          }}
        >
          {buttonText}
        </Button>
      </CardBody>
    </Card>
  );
}
export default Training;
