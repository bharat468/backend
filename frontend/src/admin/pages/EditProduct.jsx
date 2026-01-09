import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FaShoppingBag, FaArrowLeft } from "react-icons/fa";

function EditProduct() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [categorys, setCategorys] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    image: null,
    oldImage: "",
  });

  useEffect(() => {
    fetchCategories()
  }, [])


  async function fetchCategories() {
    try {
      const res = await instance.get("/category");
      setCategorys(res.data);
    } catch (error) {
      console.log("Category fetch error:", error);
    }
  }

  /* ================= BACK ================= */
  function handleBack() {
    navigate(-1);
  }

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    try {
      const res = await instance.get(`/product/${slug}`);
      const product = res.data;

      setData({
        name: product.name || "",
        slug: product.slug || "",
        category: product.category || "",
        description: product.description || "",
        originalPrice: product.originalPrice || "",
        discountedPrice: product.discountedPrice || "",
        image: null,
        oldImage: product.image || "",
      });
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  /* ================= INPUT CHANGE ================= */
  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Only image files allowed");
        imageRef.current.value = "";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be under 2MB");
        imageRef.current.value = "";
        return;
      }

      setData(prev => ({ ...prev, image: file }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  }

  /* ================= UPDATE ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      data.name.length < 3 ||
      data.category.length < 3 ||
      data.description.length < 10 ||
      !data.originalPrice
    ) {
      toast.warning("Please fill all required fields correctly");
      return;
    }

    if (
      data.discountedPrice &&
      Number(data.discountedPrice) > Number(data.originalPrice)
    ) {
      toast.error("Discounted price cannot be greater than original price");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key]) formData.append(key, data[key]);
    });

    try {
      setBtnLoading(true);

      await instance.put(`/product/${slug}`, formData, {
        withCredentials: true,
      });

      toast.success("Product updated successfully 🎉");
      navigate("/admin/products");
    } catch {
      toast.error("Failed to update product ❌");
    } finally {
      setBtnLoading(false);
    }
  }

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
        <div className="relative">
          <FaShoppingBag className="text-6xl text-teal-600 animate-bounce" />
          <div className="absolute -inset-4 border-2 border-dashed border-teal-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-3 text-slate-600">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* 🔙 BACK BUTTON */}
      <div className="max-w-3xl mx-auto mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium"
        >
          <span className="p-2 rounded-full border border-slate-300 hover:bg-slate-200 transition">
            <FaArrowLeft className="text-sm" />
          </span>
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Slug
            </label>
            <input
              type="text"
              value={data.slug}
              readOnly
              className="w-full px-4 py-3 border rounded-lg bg-slate-200 cursor-not-allowed"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            >
              <option value="">Select Category</option>
              {categorys.map((c) => (
                <option key={c._id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
          </div>

          {/* PRICES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Original Price
              </label>
              <input
                type="number"
                name="originalPrice"
                value={data.originalPrice}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg bg-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Discounted Price
              </label>
              <input
                type="number"
                name="discountedPrice"
                value={data.discountedPrice}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg bg-slate-100"
              />
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Product Image (optional)
            </label>
            <input
              type="file"
              ref={imageRef}
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
            {data.oldImage && (
              <p className="text-xs text-slate-500 mt-1">
                Old image will remain if not changed
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={btnLoading}
            className={`w-full py-3 rounded-lg text-white text-lg font-semibold
              bg-gradient-to-r from-slate-900 to-slate-800
              flex items-center justify-center gap-2
              ${btnLoading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}
            `}
          >
            {btnLoading ? "Updating..." : "Update Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;
