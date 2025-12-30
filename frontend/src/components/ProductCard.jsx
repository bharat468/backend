import { PiCurrencyInrLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import instance from "../axiosConfig"; // 🌍 import instance

function ProductCard({ product, slug }) {
  return (
    <div className="productCard">
      <Link to={`/product/${slug}`}>
        <img
          src={`${instance.defaults.baseURL}/${product.image}`} // ⭐ instance BASE URL
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
