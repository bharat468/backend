import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("user"); // user | admin
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    getUsers();
  }, [role]);

  /* ================= BACK ================= */
  function handleBack() {
    navigate(-1);
  }

  /* ================= GET USERS / ADMINS ================= */
  async function getUsers() {
    try {
      setLoading(true);
      const res = await instance.get(`/admin/users?role=${role}`);
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  /* ================= BLOCK / UNBLOCK ================= */
  async function toggleBlock(userId, isBlocked) {
    try {
      setActionId(userId);

      await instance.put(`/admin/user/block/${userId}`, {
        blocked: !isBlocked,
      });

      setUsers(prev =>
        prev.map(u =>
          u._id === userId ? { ...u, blocked: !isBlocked } : u
        )
      );

      toast.success(isBlocked ? "User unblocked" : "User blocked");
    } catch (error) {
      toast.error("Action failed");
    } finally {
      setActionId(null);
    }
  }

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <AiOutlineLoading3Quarters className="text-4xl text-teal-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* 🔙 BACK BUTTON */}
      <div className="mb-6">
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

      {/* 🔹 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {role === "user" ? "User List" : "Admin List"}
        </h2>

        {/* 🔽 DROPDOWN */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* 🔹 TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>

                  <td className="p-3">
                    {u.blocked ? (
                      <span className="text-red-600 font-semibold">
                        Blocked
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    {role === "user" && (
                      <button
                        onClick={() => toggleBlock(u._id, u.blocked)}
                        className={`px-3 py-1 rounded-lg text-white ${
                          u.blocked
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {actionId === u._id ? (
                          <AiOutlineLoading3Quarters className="animate-spin inline" />
                        ) : u.blocked ? (
                          "Unblock"
                        ) : (
                          "Block"
                        )}
                      </button>
                    )}
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

export default UserList;
