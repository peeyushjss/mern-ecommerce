import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, imageUrl, stock } = req.body;
    const newProduct = new Product({
      title,
      description,
      category,
      price,
      imageUrl,
      stock,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, price, imageUrl, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, category, price, imageUrl, stock },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};