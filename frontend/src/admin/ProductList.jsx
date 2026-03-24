import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  // const [msg, setMsg] = useState("");

  const deletedProduct = async (id) => {
    try {
      await api.delete(`/user/product/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Delete product failed:", error.response?.data || error.message);
      // setMsg("Failed to delete product. Please try again.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/user/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Fetch products failed:", error.response?.data || error.message);
      // setMsg("Failed to load products. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product List</h2>
        <Link to="/admin/products/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Product
        </Link>
      </div>
      {/* {msg && <p>{msg}</p>} */}
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">Price</th>
            <th className="border border-gray-200 px-4 py-2">Stock</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="border border-gray-200 px-4 py-2">{product.title}</td>
              <td className="border border-gray-200 px-4 py-2">${product.price}</td>
              <td className="border border-gray-200 px-4 py-2">{product.stock}</td>
              <td className="border border-gray-200 px-4 py-2">
                <Link to={`/admin/products/edit/${product._id}`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
                <button onClick={() => deletedProduct(product._id)} className="text-red-500 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}