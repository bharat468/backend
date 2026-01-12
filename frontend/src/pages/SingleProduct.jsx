import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import AIChatBox from "../components/AIChatBox";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { fetchCartCount } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [related, setRelated] = useState([]);

  async function getSingleData() {
    try {
      setLoading(true);
      const res = await instance.get(`/product/${slug}`);
      setProduct(res.data);
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  async function fetchRelated(category, title) {
    try {
      const res = await instance.post("/product/related", { title, category });
      setRelated(res.data);
    } catch {}
  }

  async function checkCart(prodId) {
    try {
      const res = await instance.get("/cart", { withCredentials: true });
      const found = res.data.find((i) => i.productId._id === prodId);
      if (found) setAlreadyInCart(true);
    } catch {}
  }

  async function handleAddToCart() {
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
      toast.success("Product added");
      navigate("/cart");
    } catch {
      toast.error("Failed");
    } finally {
      setBtnLoading(false);
    }
  }

  useEffect(() => {
    getSingleData();
  }, [slug]);

  useEffect(() => {
    if (product) {
      fetchRelated(product.category, product.name);
      if (isLoggedIn) checkCart(product._id);
    }
  }, [product, isLoggedIn]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!product) return <p className="text-center py-20">Product Not Found</p>;

  const imgSrc =
    product.image?.startsWith("http")
      ? product.image
      : `${import.meta.env.VITE_BASEURL}${product.image?.startsWith("/") ? "" : "/"}${product.image}`;

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* BACK BUTTON */}
      <div className="flex items-center gap-4 mx-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-700 hover:text-teal-700 font-medium transition"
        >
          <FaArrowLeft />
          <span className="text-slate-500 text-sm">Back</span>
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-[1.7fr,0.8fr] gap-8">

        {/* LEFT SIDE */}
        <div>
          {/* PRODUCT AREA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center">
              <img
                src={imgSrc}
                alt={product.name}
                className="max-h-[420px] object-contain mx-auto"
              />
            </div>

            <div className="space-y-5">
              <h1 className="text-3xl font-bold">{product.name}</h1>

              <p
                onClick={() => navigate(`/category/${product.category}`)}
                className="text-slate-500 text-sm uppercase cursor-pointer hover:text-teal-600"
              >
                {product.category}
              </p>

              <div className="text-xl flex items-center gap-3 font-semibold">
                <PiCurrencyInrLight size={24} />
                {product.discountedPrice ? (
                  <>
                    <span className="line-through text-slate-400">
                      {product.originalPrice}
                    </span>
                    <span className="text-teal-600 font-bold">
                      {product.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span>{product.originalPrice}</span>
                )}
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">
                {product.description}
              </p>

              <button
                onClick={handleAddToCart}
                disabled={alreadyInCart || btnLoading}
                className={`mt-4 px-6 py-3 rounded-lg font-semibold w-full sm:w-auto
                  ${
                    alreadyInCart
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                  } transition`}
              >
                {btnLoading ? "Adding..." : alreadyInCart ? "Already in Cart" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* RELATED */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-xl font-semibold mb-5">Related Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                {related.map((item) => {
                  const img =
                    item.image?.startsWith("http")
                      ? item.image
                      : `${import.meta.env.VITE_BASEURL}${item.image?.startsWith("/") ? "" : "/"}${item.image}`;

                  return (
                    <div
                      key={item._id}
                      onClick={() => navigate(`/product/${item.slug}`)}
                      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-md p-3 transition flex flex-col"
                    >
                      <img
                        src={img}
                        className="h-36 w-full object-contain rounded-lg"
                      />
                      <p className="mt-2 font-medium line-clamp-2 text-sm">{item.name}</p>
                      <p className="text-teal-600 font-bold flex items-center gap-1 text-sm">
                        <PiCurrencyInrLight size={16} />
                        {item.discountedPrice || item.originalPrice}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* CHAT BOX */}
        <div className="lg:sticky lg:top-24 h-fit pt-4">
          <AIChatBox productName={product.name} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
