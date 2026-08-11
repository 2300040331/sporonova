"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { 
  Users, 
  Plus, 
  Shield, 
  Key, 
  Trash2, 
  CheckCircle2, 
  UserCheck, 
  Lock, 
  X, 
  Edit2, 
  Save, 
  Eye, 
  EyeOff 
} from "lucide-react";

export default function UsersCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  // Forms state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin" as "Super Admin" | "Admin" | "Editor",
  });
  
  const [editingUser, setEditingUser] = useState<any | null>(null);
  
  // Password Visibility toggles
  const [showCreatePass, setShowCreatePass] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill in all fields.");
      return;
    }

    setSaving(true);

    const userRecord = {
      id: `usr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email.trim().toLowerCase(),
      passwordHash: newUser.password, // Automatically hashed on the backend PUT API
      role: newUser.role,
      status: "Active" as const,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...data.users, userRecord];
    const success = await updateData({ users: updatedUsers });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setCreateModalOpen(false);
      setNewUser({ name: "", email: "", password: "", role: "Admin" });
      setShowCreatePass(false);
    }
  };

  const handleEditUserSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser.name || !editingUser.email) {
      alert("Name and email are required.");
      return;
    }

    setSaving(true);

    const updatedUsers = data.users.map((u) => {
      if (u.id === editingUser.id) {
        const record: any = {
          ...u,
          name: editingUser.name,
          email: editingUser.email.trim().toLowerCase(),
          role: editingUser.role,
        };
        // Update passwordHash only if a new password is provided
        if (editingUser.password && editingUser.password.trim() !== "") {
          record.passwordHash = editingUser.password.trim(); // Automatically hashed on PUT
        }
        return record;
      }
      return u;
    });

    const success = await updateData({ users: updatedUsers });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setEditModalOpen(false);
      setEditingUser(null);
      setShowEditPass(false);
    }
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
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
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

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Directory Updated Live!
            </span>
          )}
          <button
            onClick={() => {
              setNewUser({ name: "", email: "", password: "", role: "Admin" });
              setCreateModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Administrator
          </button>
        </div>
      </div>

      {/* User Table Grid */}
      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e2e8e0] bg-[#f9fbf8] text-[11px] font-mono uppercase tracking-wider text-[#2c5e37]">
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Email Address</th>
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
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingUser({ ...user, password: "" });
                          setEditModalOpen(true);
                        }}
                        className="p-2 bg-[#f0f5ef] border border-[#d2e4d0] text-[#1c3c24] hover:bg-[#1c3c24] hover:text-white rounded-xl transition-all cursor-pointer"
                        title="Edit Credentials"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      
                      {user.email !== "admin@sporonova.com" && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 bg-red-50 border border-red-200 text-red-700 hover:bg-red-600 hover:text-white rounded-xl transition-all cursor-pointer"
                          title="Delete Account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE ADMINISTRATOR MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 sm:p-8 max-w-md w-full text-[#1c3c24] shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#4e8c4a]" />
                <h3 className="text-base font-bold text-[#1c3c24]">Add New Administrator</h3>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="name@sporonova.com"
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Initial Password</label>
                <div className="relative">
                  <input
                    type={showCreatePass ? "text" : "password"}
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none pr-10 focus:border-[#4e8c4a]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCreatePass(!showCreatePass)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#1c3c24] cursor-pointer"
                  >
                    {showCreatePass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Assigned Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none cursor-pointer"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8e0]">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-5 py-2.5 bg-[#f0f5ef] hover:bg-gray-200 border border-[#d2e4d0] rounded-xl text-xs font-bold text-[#1c3c24] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#1c3c24] hover:bg-[#2c5e37] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow cursor-pointer"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Create Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ADMINISTRATOR MODAL */}
      {editingUser && editModalOpen && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 sm:p-8 max-w-md w-full text-[#1c3c24] shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-[#4e8c4a]" />
                <h3 className="text-base font-bold text-[#1c3c24]">Edit Administrator</h3>
              </div>
              <button
                onClick={() => {
                  setEditingUser(null);
                  setEditModalOpen(false);
                }}
                className="p-2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditUserSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  disabled={editingUser.email === "admin@sporonova.com"}
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a] disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                  Change Password (Leave blank to keep current)
                </label>
                <div className="relative">
                  <input
                    type={showEditPass ? "text" : "password"}
                    value={editingUser.password || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none pr-10 focus:border-[#4e8c4a]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEditPass(!showEditPass)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#1c3c24] cursor-pointer"
                  >
                    {showEditPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Assigned Role</label>
                <select
                  disabled={editingUser.email === "admin@sporonova.com"}
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8e0]">
                <button
                  type="button"
                  onClick={() => {
                    setEditingUser(null);
                    setEditModalOpen(false);
                  }}
                  className="px-5 py-2.5 bg-[#f0f5ef] hover:bg-gray-200 border border-[#d2e4d0] rounded-xl text-xs font-bold text-[#1c3c24] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#1c3c24] hover:bg-[#2c5e37] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow cursor-pointer"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
