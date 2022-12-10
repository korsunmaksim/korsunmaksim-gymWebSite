import { useCallback, useEffect, useState } from "react";
import useHttp from "./useHttp.hook";

const PRODUCTS_URL = "http://localhost:5000/products/";

function useShopping() {
  const { request } = useHttp();
  const [products, setProducts] = useState([]);
  const [bagItems, setBagItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getProducts = useCallback(async function () {
    try {
      const data = await request(PRODUCTS_URL, "Cannot get products", "GET");
      setProducts(data);
    } catch (e) {}
  }, []);

  const deleteProduct = useCallback(async function (id) {
    try {
      await request(PRODUCTS_URL + String(id), "Delete error!", "DELETE");
    } catch (e) {}
  }, []);

  const createProduct = useCallback(async function (newItem) {
    try {
      await request(PRODUCTS_URL, "Create error!", "POST", {
        name: newItem.name,
        price: newItem.price,
        amount: newItem.amount,
        imageUrl: newItem.imageUrl,
      });
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts, deleteProduct]);

  function getItemAmount(id) {
    return bagItems.find((item) => item.id === id)?.amount || 0;
  }
  const openBag = () => setIsOpen(true);

  const closeBag = () => setIsOpen(false);

  const bagTotalAmount = bagItems.reduce(
    (amount, item) => amount + item.amount,
    0
  );
  function increaseBagAmount(id) {
    setBagItems((currentItems) => {
      if (!currentItems.find((item) => item.id === id))
        return [...currentItems, { id, amount: 1 }];
      else
        return currentItems.map((item) => {
          if (item.id === id) return { ...item, amount: item.amount + 1 };
          else return { ...item };
        });
    });
  }
  function decreaseBagAmount(id) {
    setBagItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.amount === 1)
        return currentItems.filter((item) => item.id !== id);
      else
        return currentItems.map((item) => {
          if (item.id === id) return { ...item, amount: item.amount - 1 };
          else return { ...item };
        });
    });
  }
  function removeFromBag(id) {
    setBagItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }
  return {
    openBag,
    closeBag,
    bagTotalAmount,
    bagItems,
    isOpen,
    getItemAmount,
    increaseBagAmount,
    decreaseBagAmount,
    removeFromBag,
    products,
    deleteProduct,
    createProduct,
  };
}

export default useShopping;
