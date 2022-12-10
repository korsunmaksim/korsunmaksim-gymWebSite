import { ShoppingItem } from "../components/shopping-item";
import { Col, Row, Button } from "react-bootstrap";
import { Bag } from "../components/bag";
import { useShoppingContext } from "../context/shopping-context";
import { useAuthContext } from "../context/auth.context";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Shopping() {
  const { userRole } = useAuthContext();
  const { products } = useShoppingContext();
  const { isAuthenticated } = useAuthContext();
  const { openBag, bagTotalAmount } = useShoppingContext();

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
        Authorize for more information{" "}
      </div>
    );
  }
  return (
    <>
      <div style={{ marginBottom: "60px", height: "30px" }}>
        {userRole === "Admin" && (
          <Button href="/add-product">Add new product</Button>
        )}
        <h1
          style={{
            color: "white",
            height: "60px",
            textAlign: "center",
            fontSize: "50px",
            position: "relative",
            bottom: "20px",
          }}
        >
          Our products
        </h1>
        <Button
          onClick={() => openBag()}
          style={{
            background: "yellow",
            color: "black",
            position: "absolute",
            right: "25px",
            top: "80px",
          }}
        >
          Bag
          {bagTotalAmount > 0 && (
            <div
              className="rounded-circle d-flex justify-content-center
          aligh-items-center"
              style={{
                color: "white",
                background: "crimson",
                position: "absolute",
                width: "1rem",
                height: "1rem",
                bottom: 0,
                right: 0,
                transform: "translate(25%,25%)",
                fontSize: 12,
              }}
            >
              {bagTotalAmount}
            </div>
          )}
        </Button>
      </div>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((item) => (
          <Col key={item._id}>
            <ShoppingItem {...item} />
          </Col>
        ))}
      </Row>
      <Bag />
    </>
  );
}

export default Shopping;
