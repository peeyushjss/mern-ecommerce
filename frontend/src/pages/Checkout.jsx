import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const Checkout = () => {
  const userId = localStorage.getItem('userId');
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const addressResponse = await api.get(`/user/address/${userId}`);
        setAddress(addressResponse.data);
        setSelectedAddress(addressResponse.data[0]?._id || null);
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

  const placeOrder = async () => {
    try {

      if (!selectedAddress) {
        alert("Please select an address before placing the order.");
        return;
      }

      const response = await api.post("/user/order", {
        userId,
        addressId: selectedAddress,
      });
      alert("Order placed successfully!");
      navigate(`/order-success/${response.data.order._id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <h2 className="text-xl font-semibold mb-2">Select Address</h2>
      {address.length === 0 ? (
        <p>No addresses found. Please add an address.</p>
      ) : (
        address.map((addr) => (
          <label key={addr._id} className="block border p-3 rounded cursor-pointer mb-2">
            <input
              type="radio"
              name="address"
              value={addr._id}
              checked={selectedAddress === addr._id}
              onChange={() => setSelectedAddress(addr._id)}
              className="mr-2"
            />
            <strong>{addr.name}</strong><br />
            <p className="text-sm">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
            <p className="text-sm">Phone: {addr.phone}</p>
          </label>
        ))
      )}
      <h2>Order Summary</h2>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={placeOrder} className="w-full bg-green-500 text-white px-4 py-2 rounded mt-4">Place Order</button>
    </div>
  );
}

export default Checkout;