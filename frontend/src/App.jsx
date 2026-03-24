import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/product/:id", element: <ProductDetails /> },

  { path: "/admin/products", element: <ProductList /> },
  { path: "/admin/products/add", element: <AddProduct /> },
  { path: "/admin/products/edit/:id", element: <EditProduct /> }

]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;