import Product from "../models/product.models.js";

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      amount: req.body.amount,
      imageUrl: req.body.imageUrl,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (e) {
    res.status(400).json({ message: e.message || "Cannot create new product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    res.status(400).json({ message: "Cannot get all products!" });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: "Cannot get  product!" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findOneAndDelete({
      _id: productId,
    });
    res.status(200).json({ message: "Product was deleted!" });
  } catch (e) {
    res.status(400).json({ message: "Cannot delete product!" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.updateOne(
      {
        _id: productId,
      },
      {
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        imageUrl: req.body.imageUrl,
      }
    );
    res.status(200).json({ message: "Product was updated!" });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export {
  createProduct,
  getAllProducts,
  getOneProduct,
  removeProduct,
  updateProduct,
};
