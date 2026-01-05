import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import instance from "../axiosConfig";
import { FaShoppingBag } from "react-icons/fa";

const ITEMS_PER_LOAD = 8;

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const observerRef = useRef(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  /* ================= FETCH ALL PRODUCTS ================= */
  async function fetchAllProducts() {
    try {
      setLoading(true);
      const res = await instance.get("/product");

      setAllProducts(res.data);

      // first random load
      const firstBatch = getRandomProducts(res.data, ITEMS_PER_LOAD);
      setVisibleProducts(firstBatch);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  /* ================= RANDOM PICK ================= */
  function getRandomProducts(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /* ================= LOAD MORE ================= */
  function loadMoreProducts() {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const more = getRandomProducts(allProducts, ITEMS_PER_LOAD);
      setVisibleProducts(prev => [...prev, ...more]);
      setLoadingMore(false);
    }, 600); // smooth delay
  }

  /* ================= OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [allProducts, loadingMore]);

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

        {/* FIRST LOAD LOADER */}
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
          <>
            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={`${product._id}-${index}`}
                  product={product}
                  slug={product.slug}
                />
              ))}
            </div>

            {/* LOAD MORE LOADER */}
            {loadingMore && (
              <div className="flex justify-center py-10">
                <FaShoppingBag className="text-4xl text-teal-600 animate-bounce" />
              </div>
            )}

            {/* OBSERVER TARGET */}
            <div ref={observerRef} className="h-10"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
