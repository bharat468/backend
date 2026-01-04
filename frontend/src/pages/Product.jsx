import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import instance from "../axiosConfig";
import { FaShoppingBag } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      setLoading(true);
      const response = await instance.get("/product");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* PAGE HEADING */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Best Products For You
          </h2>
          <p className="text-slate-500 mt-1">
            Handpicked items just for you
          </p>
        </div>

        {/* 🔥 ATTRACTIVE LOADER */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="relative">
              <FaShoppingBag className="text-6xl text-teal-600 animate-bounce" />
              <div className="absolute -inset-4 border-2 border-dashed border-teal-400 rounded-full animate-spin"></div>
            </div>

            <p className="text-slate-500 text-sm tracking-wide">
              Loading amazing products...
            </p>
          </div>
        ) : (
          /* PRODUCTS GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                slug={product.slug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
