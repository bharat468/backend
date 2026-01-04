import { PiCurrencyInrLight } from "react-icons/pi";
import { FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";
import instance from "../axiosConfig";
import { useState } from "react";

function ProductCard({ product, slug }) {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">

      {/* IMAGE */}
      <Link to={`/product/${slug}`} className="block relative h-56 ">
        
        {/* IMAGE LOADER */}
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <FaImage className="text-3xl text-teal-500 animate-pulse" />
          </div>
        )}

        <img
          src={`${instance.defaults.baseURL}/${product.image}`}
          alt={product.name}
          onLoad={() => setImgLoading(false)}
          className={`w-full h-56 object-contain transition-transform duration-300 group-hover:scale-105 ${
            imgLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </Link>

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        {/* PRODUCT NAME */}
        <Link to={`/product/${slug}`}>
          <h3 className="text-lg font-semibold text-slate-800 line-clamp-1 hover:text-teal-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="flex items-center gap-2 text-slate-700">
          <PiCurrencyInrLight className="text-xl" />

          {product.discountedPrice ? (
            <div className="flex items-center gap-2">
              <del className="text-slate-400 text-sm">
                {product.originalPrice}
              </del>
              <span className="text-lg font-bold text-teal-600">
                {product.discountedPrice}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-slate-800">
              {product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
