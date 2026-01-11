import React, { useRef, useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FaShoppingBag } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


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
  const [categorys, setCategorys] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    fatchCetegorys()
  }, [])

  async function fatchCetegorys() {
    try {
      const res = await instance.get("/category")
      setCategorys(res.data)
    } catch (error) {
      console.log("categorys fatch error")
    }
  }


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

    if (
      data.name.length < 3 ||
      data.category.length < 3 ||
      data.description.length < 10 ||
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

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="flex items-center gap-4 m-6 mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2
            text-slate-700 hover:text-slate-900
            font-medium"
        >
          <FaArrowLeft />
          <span className="text-slate-500 text-sm">
            Back
          </span>
        </button>
      </div>
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
              maxLength={500}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg bg-slate-100 
      ${data.description.length > 0 && data.description.length < 10 ? "border-red-500" : ""}`}
            />

            <div className="flex justify-between text-xs mt-1">
              {/* Character count */}
              <span className="text-slate-400">
                {data.description.length}/500
              </span>

              {/* Error message */}
              {data.description.length > 0 && data.description.length < 10 && (
                <span className="text-red-500 font-semibold">
                  Minimum 10 characters required
                </span>
              )}
            </div>
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
              flex items-center justify-center gap-3
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"}
            `}
          >
            {loading && (
              <div className="relative">
                <FaShoppingBag className="text-xl text-teal-300 animate-bounce" />
                <div className="absolute -inset-2 border border-dashed border-teal-300 rounded-full animate-spin"></div>
              </div>
            )}
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
