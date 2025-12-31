import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import First from "./pages/First";
import AdminLogin from "./admin/pages/AdminLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./contexts/AuthProvider";
import AddProduct from "./admin/pages/AddProduct";
import ProtectedRouters from "./admin/components/ProtectedRouters";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import AdminHome from "./admin/pages/AdminHome";
import AdminCreateCoupon from "./admin/pages/AdminCreateCoupon";
import { CartProvider } from "./contexts/CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // ❗ FIX: remove slash here
      { path: "product/:slug", element: <SingleProduct /> },
      { path: "cart", element: <Cart /> },

      // ================= ADMIN AREA =================
      { path: "admin", element: <Navigate to="admin/login" replace /> }, // nested redirect

      { path: "admin/login", element: <AdminLogin /> },

      { 
        path: "admin/home",
        element: (
          <ProtectedRouters>
            <AdminHome />
          </ProtectedRouters>
        ),
      },

      {
        path: "admin/product/add",
        element: (
          <ProtectedRouters>
            <AddProduct />
          </ProtectedRouters>
        ),
      },

      {
        path: "admin/coupon/create",
        element: (
          <ProtectedRouters>
            <AdminCreateCoupon />
          </ProtectedRouters>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
