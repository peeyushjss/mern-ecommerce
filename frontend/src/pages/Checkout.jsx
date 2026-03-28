import { useState, useEffect } from "react";
import api from "../api/axios";

const Checkout = () => {
  const userId = localStorage.getItem('userId');
  const [address, setAddress] = useState([]);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressResponse = await api.get(`/user/address/${userId}`);
        setAddress(addressResponse.data);
        const cartResponse = await api.get(`/user/cart/${userId}`);
        setCart(cartResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!cart) {
    return <div>Loading...</div>;
  }

  const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <h2 className="text-xl font-semibold mb-2">Select Address</h2>
      {address.length === 0 ? (
        <p>No addresses found. Please add an address.</p>
      ) : (
        address.map((addr) => (
          <div key={addr._id} className="border border-gray-300 rounded p-4 mb-4">
            <p>{addr.fullName}</p>
            <p>{addr.phone}</p>
            <p>{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
          </div>
        ))
      )}
      <h2>Order Summary</h2>
      <p>Total: ${total.toFixed(2)}</p>
      <button className="w-full bg-green-500 text-white px-4 py-2 rounded mt-4">Place Order</button>
    </div>
  );
}

export default Checkout;