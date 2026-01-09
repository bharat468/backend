import React, { useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    slug: "",
  });

  const [loading, setLoading] = useState(false);

  /* 🏷 CREATE SLUG */
  function createSlug(e) {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setData((prev) => ({ ...prev, name, slug }));
  }

  /* 🔙 BACK BUTTON */
  function handleBack() {
    navigate(-1);
  }

  /* 📩 SUBMIT HANDLER */
  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    if (!data.slug.trim()) {
      toast.error("Slug could not generate");
      return;
    }

    try {
      setLoading(true);

      await instance.post("/category/add", data, {
        withCredentials: true,
      });

      toast.success("Category created successfully 🎉");

      setData({ name: "", slug: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* 🔙 BACK */}
      <div className="max-w-xl mx-auto mb-6">
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
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Add Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={data.name}
              onChange={createSlug}
              placeholder="Enter Your Category Name"
              minLength={2}
              required
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
              placeholder="Slug"
              readOnly
              className="w-full px-4 py-3 border rounded-lg bg-slate-200 cursor-not-allowed"
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
            {loading ? "Adding Category..." : "Add Category"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddCategory;
