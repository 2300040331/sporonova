"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Users, Plus, Shield, Key, Trash2, CheckCircle2, UserCheck, Lock } from "lucide-react";

export default function UsersCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin" as "Super Admin" | "Admin" | "Editor",
  });

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const userRecord = {
      id: `usr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      passwordHash: newUser.password,
      role: newUser.role,
      status: "Active" as const,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...data.users, userRecord];
    await updateData({ users: updatedUsers });
    setSaving(false);
    setModalOpen(false);
    setNewUser({ name: "", email: "", password: "", role: "Admin" });
  };

  const handleToggleUserStatus = async (user: any) => {
    const newStatus = (user.status === "Active" ? "Inactive" : "Active") as "Active" | "Inactive";
    const updated = data.users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u));
    await updateData({ users: updated });
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm("Are you sure you want to delete this administrator account?")) {
      const updated = data.users.filter((u) => u.id !== id);
      await updateData({ users: updated });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <Shield className="w-3.5 h-3.5 text-[#4e8c4a]" /> Super Admin Restricted
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">User Management & Permissions</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Manage administrator accounts, assign roles (Super Admin, Admin, Editor), and reset security access.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Administrator
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e2e8e0] bg-[#f9fbf8] text-[11px] font-mono uppercase tracking-wider text-[#2c5e37]">
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8e0] text-xs">
              {data.users.map((user) => (
                <tr key={user.id} className="hover:bg-[#f9fbf8] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1c3c24] flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#4e8c4a]" /> {user.name}
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-mono font-bold">{user.email}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f0f5ef] text-[#1c3c24] border border-[#d2e4d0]">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleUserStatus(user)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {user.email !== "admin@sporonova.com" && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-xl transition-all cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
