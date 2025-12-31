import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // --------------------------
  // 1️⃣ Product details fetch
  // --------------------------
  async function getSingleData() {
    try {
      setLoading(true);
      const response = await instance.get("/product/" + slug);
      setProduct(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  // --------------------------
  // 2️⃣ Check if in cart
  // --------------------------
  async function checkCart(prodId) {
    try {
      const res = await instance.get("/cart", { withCredentials: true });
      const found = res.data.find((item) => item.productId._id === prodId);
      if (found) setAlreadyInCart(true);
    } catch (error) {
      console.log(error);
    }
  }

  // --------------------------
  // 3️⃣ Add to cart on button click
  // --------------------------
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
      setAlreadyInCart(true);  // UI update
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  }

  // --------------------------
  // On page load
  // --------------------------
  useEffect(() => {
    getSingleData();
  }, [slug]);

  // --------------------------
  // After product arrives → check cart
  // --------------------------
  useEffect(() => {
    if (product && isLoggedIn) {
      checkCart(product._id);
    }
  }, [product, isLoggedIn]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="single-product">
      <div className="single-product-image">
        <img
          src={`${instance.defaults.baseURL}/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="single-product-details">
        <h1>{product.name}</h1>
        <p className="category">{product.category}</p>

        <p className="price">
          <PiCurrencyInrLight />
          {product.discountedPrice ? (
            <>
              <del>{product.originalPrice}</del>{" "}
              <strong>{product.discountedPrice}</strong>
            </>
          ) : (
            <strong>{product.originalPrice}</strong>
          )}
        </p>

        <p className="description">{product.description}</p>

        {/* ---------- BUTTON ---------- */}
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={alreadyInCart || btnLoading}
        >
          {btnLoading
            ? "Adding..."
            : alreadyInCart
            ? "Already in Cart"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
