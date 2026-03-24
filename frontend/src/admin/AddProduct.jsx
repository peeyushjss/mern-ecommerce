import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function AddProduct() {
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      await api.post("/user/product", data);
      setMsg("Product added successfully!");
      setFormData({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        imageUrl: "",
        category: "",
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("Add Product failed:", error.response?.data || error.message);
      setMsg(error.response?.data?.message || "Add product failed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      {msg && <p>{msg}</p>}
      <form className="space-y-3" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input className="w-full p-2 border border-gray-200 rounded"
              type={key === "price" || key === "stock" ? "number" : "text"}
              id={key}
              name={key}
              placeholder={key}
              value={formData[key]}
              onChange={handleChange}
            // required
            />
          </div>
        ))}
        {/* <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          required
        /> */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Product
        </button>
      </form>
    </div>
  );
};