import React, { useRef, useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

function AddProduct() {
  const imageRef = useRef(null);

  const [data, setData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- INPUT CHANGE ---------------- */
  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (!file) return;

      // image type check
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files allowed");
        imageRef.current.value = "";
        return;
      }

      // image size check (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be under 2MB");
        imageRef.current.value = "";
        return;
      }

      setData({ ...data, image: file });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  /* ---------------- CREATE SLUG ---------------- */
  function createSlug(e) {
    const value = e.target.value;
    if (!value) return;

    const slug = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setData((prev) => ({ ...prev, slug }));
  }

  /* ---------------- SUBMIT ---------------- */
  async function handleSubmit(e) {
    e.preventDefault();

    // basic validation
    if (
      data.name.length < 3 ||
      data.category.length < 3 ||
      !data.originalPrice ||
      !data.image
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
    Object.keys(data).forEach((key) => {
      if (data[key] !== "") {
        formData.append(key, data[key]);
      }
    });

    try {
      setLoading(true);

      await instance.post("/product", formData, {
        withCredentials: true,
      });

      toast.success("Product added successfully 🎉");

      // reset form
      setData({
        name: "",
        slug: "",
        category: "",
        description: "",
        originalPrice: "",
        discountedPrice: "",
        image: null,
      });

      if (imageRef.current) imageRef.current.value = "";
    } catch (error) {
      toast.error("Failed to add product ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border p-8">

        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Add New Product
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
              onBlur={createSlug}
              minLength={3}
              maxLength={100}
              required
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="block text-sm font-semibold mb-1">Slug</label>
            <input
              type="text"
              name="slug"
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
            <input
              type="text"
              name="category"
              value={data.category}
              onChange={handleChange}
              minLength={3}
              maxLength={50}
              required
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
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
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg bg-slate-100"
            />
            <p className="text-xs text-slate-400 text-right">
              {data.description.length}/500
            </p>
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
                min={1}
                max={1000000}
                required
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
                min={0}
                max={data.originalPrice || 1000000}
                className="w-full px-4 py-3 border rounded-lg bg-slate-100"
              />
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Product Image (max 2MB)
            </label>
            <input
              type="file"
              name="image"
              ref={imageRef}
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-lg font-semibold
              bg-gradient-to-r from-slate-900 to-slate-800
              flex items-center justify-center gap-2
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}
            `}
          >
            {loading && <FaSpinner className="animate-spin" />}
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
