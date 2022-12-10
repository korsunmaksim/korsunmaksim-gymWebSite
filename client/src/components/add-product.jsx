import { Button } from "bootstrap-react";
import { React, useRef } from "react";
import { useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import axios from "../axios";
import { useShoppingContext } from "../context/shopping-context";
import useHttp from "../hooks/useHttp.hook";

function AddProduct() {
  const { createProduct } = useShoppingContext();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    amount: 0,
    imageUrl: "",
  });

  const changeHandler = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const inputFileRef = useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setNewProduct({
        ...newProduct,
        imageUrl: data.url,
      });
      console.log(newProduct.imageUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <Card
        className="mx-auto "
        style={{
          width: "800px",
          top: "100px",
        }}
      >
        <Card.Body className="d-flex flex-column">
          <h1 style={{ textAlign: "center" }}>New product</h1>
          <input
            className="mt-3"
            placeholder="Enter name of product"
            type="text"
            name="name"
            onChange={changeHandler}
          />
          <input
            className="mt-3"
            placeholder="Enter price"
            name="price"
            type="number"
            onChange={changeHandler}
          />
          <input
            className="mt-3"
            placeholder="Enter amount"
            name="amount"
            type="number"
            onChange={changeHandler}
          />
          <Button
            onClick={() => inputFileRef.current.click()}
            variant="outlined"
            size="medium"
            style={{ bottom: "320px", marginTop: "10px" }}
          >
            Choose product image
          </Button>
          <input
            ref={inputFileRef}
            type="file"
            onChange={handleChangeFile}
            hidden
          />
          <img src={`http://localhost:5000${newProduct.imageUrl}`} />
          <Button
            style={{
              left: "300px",
              fontSize: "20px",
              marginTop: "10px",
            }}
            onClick={() => {
              createProduct(newProduct);
              setNewProduct({ name: "", price: 0, amount: 0, imageUrl: "" });
            }}
          >
            Save new product
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddProduct;
