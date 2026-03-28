import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await api.get(`/user/cart/${userId}`);
      setCartItems(response.data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await api.delete("/user/cart", { data: { userId, productId } });
      // setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
      fetchCartItems(); // Refresh cart items after removal
      window.dispatchEvent(new Event('cartUpdated')); // Notify Navbar to update cart count
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }
      await api.put("/user/cart", { userId, productId, quantity });
      // setCartItems((prevItems) =>
      //   prevItems.map((item) =>
      //     item.productId === productId ? { ...item, quantity } : item
      //   )
      // );
      fetchCartItems(); // Refresh cart items after update
      window.dispatchEvent(new Event('cartUpdated')); // Notify Navbar to update cart count
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center justify-between p-4 border rounded"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.productId.title}
                    </h3>
                    <p className="text-gray-600">
                      ${item.productId.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      updateCartItem(item.productId._id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateCartItem(item.productId._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <div>
                  <p className="font-semibold">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div >

      <div className="max-w-4xl mx-auto p-6 mt-6 border-t">
        <h3 className="text-xl font-bold">
          Total: ${total.toFixed(2)}
        </h3>
        <button onClick={() => navigate("/checkout/address")} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
          Checkout
        </button>
      </div>
    </>
  );
};

export default Cart;