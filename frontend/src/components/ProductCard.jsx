import { PiCurrencyInrLight } from "react-icons/pi";
import { Link } from "react-router-dom";

function ProductCard({ product, slug }) {
  // 💡 backend URL auto switch (local & deploy)
  const backendURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://backend-b7x0.onrender.com";

  return (
    <div className="productCard">
      <Link to={`/product/${slug}`}>
        <img
          src={`${backendURL}/${product.image}`} // 🧠 auto image base URL
          alt={product.name}
        />
      </Link>

      <div className="content">
        <Link to={`/product/${slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>
          <PiCurrencyInrLight />
          {product.discountedPrice ? (
            <>
              <del>{product.originalPrice}</del>
              <strong>{product.discountedPrice}</strong>
            </>
          ) : (
            <strong>{product.originalPrice}</strong>
          )}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
