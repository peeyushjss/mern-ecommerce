import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutAddress from "./pages/CheckoutAddress";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />, children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> },
      { path: "/checkout/address", element: <CheckoutAddress /> },
      { path: "/checkout", element: <Checkout /> }

    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;