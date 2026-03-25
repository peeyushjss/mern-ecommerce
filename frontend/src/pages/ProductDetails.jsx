import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/user/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-contain bg-white rounded" />
      <div>
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-4">${product.price}</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductDetails;