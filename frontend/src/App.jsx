import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import First from "./pages/First";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import CategoryProducts from "./pages/CategoryProducts";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminHome from "./admin/pages/AdminHome";
import AddProduct from "./admin/pages/AddProduct";
import AdminCreateCoupon from "./admin/pages/AdminCreateCoupon";
import ProductList from "./admin/pages/ProductList";
import UserList from "./admin/pages/UserList";
import EditProduct from "./admin/pages/EditProduct";
import CouponList from "./admin/pages/CouponList";
import EditCoupon from "./admin/pages/EditCoupon";
import AddCategory from "./admin/pages/AddCategory";

import AdminLayout from "./admin/components/AdminLayout";
import ProtectedRouters from "./admin/components/ProtectedRouters";

import AuthProvider from "./contexts/AuthProvider";
import { CartProvider } from "./contexts/CartContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <First />
      </CartProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "product/:slug",
        element: <SingleProduct />
      },
      {
        path: "category/:category",
        element: <CategoryProducts />
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },

  {
    path: "/admin/login",
    element: <AdminLogin />
  },

  {
    path: "/admin",
    element: (
      <ProtectedRouters>
        <AdminLayout />
      </ProtectedRouters>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />
      },
      {
        path: "home",
        element: <AdminHome />
      },
      {
        path: "product/add",
        element: <AddProduct />
      },
      {
        path: "product/edit/:slug",
        element: <EditProduct />
      },
      {
        path: "products",
        element: <ProductList />
      },
      {
        path: "users",
        element: <UserList />
      },
      {
        path: "coupon/create",
        element: <AdminCreateCoupon />
      },
      {
        path: "coupons",
        element: <CouponList />
      },
      {
        path: "coupon/edit/:id",
        element: <EditCoupon />
      },
      {
        path: "category/add",
        element: <AddCategory />
      },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
