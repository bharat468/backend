import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaShoppingBag,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* 🔥 IMAGE URL RESOLVER (MOST IMPORTANT) */
const getImageSrc = (image) => {
  if (!image) return "https://via.placeholder.com/60";
  if (image.startsWith("http")) return image; // already full URL
  return `${instance.defaults.baseURL}/${image}`; // relative path
};

function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= BACK ================= */
  function handleBack() {
    navigate(-1);
  }

  /* ================= FETCH PRODUCTS ================= */
  async function fetchProducts() {
    try {
      const res = await instance.get("/product");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  /* ================= DELETE PRODUCT ================= */
  async function deleteProduct(slug) {
    try {
      setDeletingSlug(slug);
      await instance.delete(`/product/${slug}`);
      setProducts((prev) => prev.filter((p) => p.slug !== slug));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeletingSlug("");
    }
  }

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-100">
        <FaShoppingBag className="text-6xl text-teal-600 animate-bounce" />
        <p className="mt-3 text-slate-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* 🔙 BACK */}
      <button
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-slate-700 hover:text-slate-900"
      >
        <FaArrowLeft />
        <span className="text-sm">Back</span>
      </button>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">All Products</h2>

        <Link
          to="/admin/product/add"
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          <FaPlus /> Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-slate-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.slug} className="border-t">
                  {/* IMAGE */}
                  <td className="p-3">
                    <img
                      src={getImageSrc(product.image)}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded border"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-3 font-medium">{product.name}</td>

                  {/* PRICE */}
                  <td className="p-3 font-semibold text-teal-600">
                    ₹ {product.discountedPrice || product.originalPrice}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 flex gap-4 items-center">
                    <Link
                      to={`/admin/product/edit/${product.slug}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() => deleteProduct(product.slug)}
                      className="text-red-600 hover:text-red-800"
                    >
                      {deletingSlug === product.slug ? (
                        <FaShoppingBag className="animate-bounce text-teal-600" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
