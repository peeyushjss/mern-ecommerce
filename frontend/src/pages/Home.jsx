import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // const fetchProducts = async () => {
  //   try {
  //     const response = await api.get(`/user/product?search=${search}&category=${category}`);
  //     setProducts(response.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/user/product?search=${search}&category=${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [search, category]);

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-3">
        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="border py-2 px-3 rounded w-1/2" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border py-2 px-3 rounded">
          <option value="">All Categories</option>
          <option value="electronic">Electronic</option>
          <option value="fashion">Fashion</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} className="border rounded p-3 flex flex-col items-center hover:shadow-lg transition">
            <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-contain bg-white rounded" />
            <h3 className="text-lg font-bold">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home