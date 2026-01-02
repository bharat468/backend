import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

/* ================= USER PAGES ================= */
import First from "./pages/First";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";

/* ================= ADMIN PAGES ================= */
import AdminLogin from "./admin/pages/AdminLogin";
import AdminHome from "./admin/pages/AdminHome";
import AddProduct from "./admin/pages/AddProduct";
import AdminCreateCoupon from "./admin/pages/AdminCreateCoupon";

/* ================= ADMIN COMPONENTS ================= */
import AdminLayout from "./admin/components/AdminLayout";
import ProtectedRouters from "./admin/components/ProtectedRouters";

/* ================= CONTEXT ================= */
import AuthProvider from "./contexts/AuthProvider";
import { CartProvider } from "./contexts/CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      /* ---------- USER ROUTES ---------- */
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "product/:slug", element: <SingleProduct /> },
      { path: "cart", element: <Cart /> },

      /* ---------- ADMIN LOGIN ---------- */
      { path: "admin/login", element: <AdminLogin /> },

      /* ---------- ADMIN PROTECTED AREA ---------- */
      {
        path: "admin",
        element: (
          <ProtectedRouters>
            <AdminLayout />
          </ProtectedRouters>
        ),
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          { path: "home", element: <AdminHome /> },
          { path: "product/add", element: <AddProduct /> },
          { path: "coupon/create", element: <AdminCreateCoupon /> },
        ],
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
