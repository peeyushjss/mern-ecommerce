import { useParams } from "react-router";

const OrderSuccess = () => {

  const { orderId } = useParams();

  const goBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600">Order Placed Successfully!</h1>

      <p className="mt-4">Your Order ID is: <span className="font-semibold">{orderId}</span></p>
      <p>Thank you for your purchase. Your order has been placed and is being processed.</p>
      <button onClick={goBackToHome} className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded">
        Go Back to Home
      </button>
    </div>
  );
}

export default OrderSuccess;