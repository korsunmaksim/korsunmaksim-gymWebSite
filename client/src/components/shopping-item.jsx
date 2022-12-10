import React from "react";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useAuthContext } from "../context/auth.context";
import { useShoppingContext } from "../context/shopping-context";
import { formatCurrency } from "../utilities/currency-format";

export function ShoppingItem(props) {
  const { userRole } = useAuthContext();
  const {
    getItemAmount,
    increaseBagAmount,
    decreaseBagAmount,
    removeFromBag,
    deleteProduct,
  } = useShoppingContext();
  const amount = getItemAmount(props._id);
  const [left, setLeft] = useState(props.amount);
  return (
    <Card className="h-100 w-18rem">
      <Card.Img
        variant="top"
        src={`http://localhost:5000${props.imageUrl}`}
        height="256px"
        width="256 px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>
          <div>
            <span className="fs-3 me-auto">{props.name}</span>
            <span className="ms-2  text-muted">{props.price}$</span>
          </div>
          {userRole === "Admin" && (
            <Button
              style={{
                position: "absolute",
                right: "20px",
                bottom: "80px",
                backgroundColor: "red",
              }}
              onClick={() => deleteProduct(props._id)}
            >
              Delete product
            </Button>
          )}
        </Card.Title>
        <div className="mt-auto">
          {amount === 0 ? (
            <Button
              className="mb-3 mt-3"
              onClick={() => {
                increaseBagAmount(props._id);
                setLeft((prev) => prev - 1);
              }}
              disabled={left === 0}
            >
              Add to the bag
            </Button>
          ) : (
            <div>
              <div className="d-flex align-items-center flex-row">
                <Button
                  onClick={() => {
                    increaseBagAmount(props._id);
                    setLeft((prev) => prev - 1);
                  }}
                  className="w-30 me-auto "
                  style={{ fontSize: 10 }}
                  disabled={left === 0}
                >
                  Add to the bag
                </Button>
                {left === 0 && (
                  <h2
                    style={{
                      color: "red",
                      fontSize: "14px",
                      position: "absolute",
                      left: "130px",
                    }}
                  >
                    Sold out
                  </h2>
                )}
                <Button
                  onClick={() => {
                    decreaseBagAmount(props._id);
                    setLeft((prev) => prev + 1);
                  }}
                  style={{ fontSize: 10 }}
                  className="m-2"
                >
                  Remove one
                </Button>
                <Button
                  onClick={() => {
                    removeFromBag(props._id);
                    setLeft(props.amount);
                  }}
                  style={{ fontSize: 10 }}
                >
                  Remove all
                </Button>
              </div>
              <span className="me-auto" style={{ fontSize: 14 }}>
                In the bag: {amount} {amount > 1 ? "items" : "item"} for{" "}
                {formatCurrency(amount * props.price)}
              </span>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
