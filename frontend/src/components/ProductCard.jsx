import { PiCurrencyInrLight } from "react-icons/pi";
import { Link } from "react-router-dom";

function ProductCard({ product, slug }) {
  return (
    <div className="productCard">
      {/* <img src={product.image} alt={product.name} /> */}
      <Link to={`/product/${slug}`}>
        <img
          src={`http://localhost:3000/${product.image}`}
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
        {/* <button>Add To Cart</button> */}
      </div>
    </div>
  );
}

export default ProductCard;