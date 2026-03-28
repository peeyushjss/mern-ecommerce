import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const CheckoutAddress = () => {
  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    userId: userId,
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/address", formData);
      navigate("/checkout");
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>
      {Object.keys(formData).map((key) => (
        <div key={key} className="mb-4">
          <label className="block text-gray-700 mb-2 capitalize">{key}</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Address
      </button>
    </div>
  );
}

export default CheckoutAddress;