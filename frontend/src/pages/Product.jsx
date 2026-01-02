import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import instance from "../axiosConfig";

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

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-4 animate-pulse"
              >
                <div className="h-56 bg-slate-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
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
