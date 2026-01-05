import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import {
    FaEdit,
    FaTrash,
    FaShoppingBag,
    FaArrowLeft,
    FaPlus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CouponList() {
    const navigate = useNavigate();

    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchCoupons();
    }, []);

    /* ================= BACK ================= */
    function handleBack() {
        navigate(-1);
    }

    /* ================= FETCH COUPONS ================= */
    async function fetchCoupons() {
        try {
            const res = await instance.get("/coupon", { withCredentials: true });
            setCoupons(res.data);
        } catch (error) {
            toast.error("Failed to load coupons");
        } finally {
            setLoading(false);
        }
    }

    /* ================= DELETE COUPON ================= */
    async function deleteCoupon(id) {
        try {
            setDeletingId(id);
            await instance.delete(`/coupon/${id}`);

            setCoupons(prev => prev.filter(c => c._id !== id));
            toast.success("Coupon deleted successfully");
        } catch (error) {
            toast.error("Failed to delete coupon");
        } finally {
            setDeletingId(null);
        }
    }

    /* ================= LOADER ================= */
    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-100">
                <div className="relative">
                    <FaShoppingBag className="text-6xl text-teal-600 animate-bounce" />
                    <div className="absolute -inset-4 border-2 border-dashed border-teal-500 rounded-full animate-spin"></div>
                </div>
                <p className="mt-3 text-slate-600">Loading coupons...</p>
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* 🔙 BACK BUTTON */}
            <div className="mb-6 flex justify-between items-center">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium"
                >
                    <span className="p-2 rounded-full border border-slate-300 hover:bg-slate-200 transition">
                        <FaArrowLeft className="text-sm" />
                    </span>
                    <span className="text-sm">Back</span>
                </button>

                {/* ADD COUPON */}
                <Link
                    to="/admin/coupon/create"
                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                >
                    <FaPlus /> Add Coupon
                </Link>
            </div>

            {/* HEADER */}
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                All Coupons
            </h2>

            {/* TABLE */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="p-3">Code</th>
                            <th className="p-3">Discount %</th>
                            <th className="p-3">Start Date</th>
                            <th className="p-3">Expiry Date</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {coupons.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-slate-500">
                                    No coupons found
                                </td>
                            </tr>
                        ) : (
                            coupons.map(coupon => (
                                <tr key={coupon._id} className="border-t">

                                    <td className="p-3 font-semibold">
                                        {coupon.code}
                                    </td>

                                    <td className="p-3 text-teal-600 font-semibold">
                                        {coupon.discountPercent}%
                                    </td>

                                    <td className="p-3">
                                        {new Date(coupon.startDate).toLocaleDateString()}
                                    </td>

                                    <td className="p-3">
                                        {new Date(coupon.expiresAt).toLocaleDateString()}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="p-3 flex gap-4 items-center">
                                        <Link
                                            to={`/admin/coupon/edit/${coupon._id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaEdit />
                                        </Link>

                                        <button
                                            onClick={() => deleteCoupon(coupon._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            {deletingId === coupon._id ? (
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

export default CouponList;
