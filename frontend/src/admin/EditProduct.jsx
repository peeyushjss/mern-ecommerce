import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import { useParams } from "react-router";

export default function EditProduct() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  // const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    category: "",
  });

  const allowedFields = ["title", "description", "price", "stock", "imageUrl", "category"];

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await api.get(`/user/product/${id}`);
        const productData = response.data;
        const filteredData = Object.fromEntries(
          Object.entries(productData).filter(([key]) => allowedFields.includes(key))
        );

        console.log("Fetched product data:", productData);
        console.log('--------------------------------')
        console.log("Fetched filtered data:", filteredData);

        setFormData(filteredData);
      } catch (error) {
        console.error(error);
        setMsg("Failed to load product. Please try again.");
      }
    };

    loadProduct();
  }, []);


  // const fetchProduct = async () => {
  //   try {
  // const response = await api.get(`/user/product/${id}`);
  // const productData = response.data;
  // const filteredData = Object.fromEntries(
  //   Object.entries(productData).filter(([key]) => allowedFields.includes(key))
  // );
  // setFormData(filteredData);
  //   } catch (error) {
  //     console.error("Fetch product failed:", error.response?.data || error.message);
  //     setMsg("Failed to load product. Please try again.");
  //   }
  // };

  // useEffect(() => {
  //   fetchProduct();
  // }, []);


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
      setMsg("Product updated successfully!");
      setFormData({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        imageUrl: "",
        category: "",
      });
    } catch (error) {
      console.error("Update Product failed:", error.response?.data || error.message);
      setMsg(error.response?.data?.message || "Update product failed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      {msg && <p>{msg}</p>}
      <form className="space-y-3" onSubmit={handleSubmit}>
        {allowedFields.map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input className="w-full p-2 border border-gray-200 rounded"
              type={key === "price" || key === "stock" ? "number" : "text"}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </div>
        ))}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Update Product
        </button>
      </form>
    </div>
  );

}
