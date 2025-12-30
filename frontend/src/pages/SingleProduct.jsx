import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const [message, setMessage] = useState({
    state: "",
    text: "",
  });

  async function getSingleData() {
    try {
      setLoading(true);
      const response = await instance.get("/product/" + slug);
      setProduct(response.data[0]); // API returns array
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleData();
  }, [slug]);

  async function handleAddToCart(productId) {
    if (!isLoggedIn) {
      navigate("/login?nextPage=/product/" + slug);
    } else {
      const response = await instance.post(
        "/cart/add",
        { productId: productId, quantity: 1 },
        { withCredentials: true }
      );
      navigate("/cart");
      if (response.status === 201) {
        setMessage({
          state: "success",
          text: "Product Added to Cart",
        });
      }
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="single-product">
      {message.state.length > 0 && (
        <h2 className={`${message.state === "success" ? "success" : "error"}`}>
          {message.text}
        </h2>
      )}

      <div className="single-product-image">
        <img
          src={`${instance.defaults.baseURL}/${product.image}`}  // ⭐ HERE
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

        <button
          className="add-to-cart"
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
