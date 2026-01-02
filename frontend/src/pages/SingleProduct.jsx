import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { fetchCartCount } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // 🔹 Fetch product
  async function getSingleData() {
    try {
      setLoading(true);
      const res = await instance.get("/product/" + slug);
      setProduct(res.data[0]);
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Check cart
  async function checkCart(prodId) {
    try {
      const res = await instance.get("/cart", { withCredentials: true });
      const found = res.data.find(
        (item) => item.productId._id === prodId
      );
      if (found) setAlreadyInCart(true);
    } catch {}
  }

  // 🔹 Add to cart
  async function handleAddToCart() {
    // ❌ Not logged in → send to login with nextPage
    if (!isLoggedIn) {
      navigate(`/login?nextPage=/product/${slug}`);
      return;
    }

    try {
      setBtnLoading(true);
      await instance.post(
        "/cart/add",
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );

      setAlreadyInCart(true);
      fetchCartCount();
      toast.success("Product added to cart");
      navigate("/cart");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setBtnLoading(false);
    }
  }

  useEffect(() => {
    getSingleData();
  }, [slug]);

  useEffect(() => {
    if (product && isLoggedIn) {
      checkCart(product._id);
    }
  }, [product, isLoggedIn]);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center py-20">Product not found</p>;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* IMAGE */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
          <img
            src={`${instance.defaults.baseURL}/${product.image}`}
            alt={product.name}
            className="max-h-96 object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-slate-500 text-sm uppercase">
            {product.category}
          </p>

          <div className="flex items-center gap-3 text-xl">
            <PiCurrencyInrLight />
            {product.discountedPrice ? (
              <>
                <del className="text-slate-400">
                  {product.originalPrice}
                </del>
                <span className="text-teal-600 font-bold">
                  {product.discountedPrice}
                </span>
              </>
            ) : (
              <span className="font-bold">
                {product.originalPrice}
              </span>
            )}
          </div>

          <p className="text-slate-600">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={alreadyInCart || btnLoading}
            className={`mt-4 px-6 py-3 rounded-lg font-semibold
              ${
                alreadyInCart
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }
            `}
          >
            {btnLoading
              ? "Adding..."
              : alreadyInCart
              ? "Already in Cart"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
