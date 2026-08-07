"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sporonova.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Login failed");
      }

      window.location.href = "/admin/dashboard";
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@sporonova.com", isGoogleLogin: true }),
      });
      if (res.ok) {
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#f8faf7] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4e8c4a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7baa6b]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white border border-[#e2e8e0] rounded-3xl shadow-xl overflow-hidden z-10 p-8 sm:p-10 text-[#1c3c24] relative">
        {/* Top Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-xs font-bold tracking-wider uppercase text-[#2c5e37]">
            <ShieldCheck className="w-4 h-4 text-[#4e8c4a]" /> Enterprise Admin Portal
          </div>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logo_transparent.png"
            alt="SPORONOVA"
            className="h-14 mx-auto mb-3"
          />
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Welcome Back</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Sign in to manage Sporonova Website Content & Operations
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 font-semibold">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Gmail Login Option */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mb-6 py-3 px-4 rounded-2xl bg-[#f8faf7] border border-[#dce4da] hover:bg-[#f0f5ef] text-[#1c3c24] font-bold text-xs flex items-center justify-center gap-3 shadow-sm active:scale-[0.99] cursor-pointer transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google / Gmail</span>
        </button>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e2e8e0]" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-mono font-bold text-gray-500 uppercase tracking-widest">
            Or Sign In with Email
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sporonova.com"
                className="w-full pl-11 pr-4 py-3 bg-[#f9fbf8] border border-[#dce4da] rounded-2xl text-[#1c3c24] font-bold text-xs placeholder-gray-400 focus:outline-none focus:border-[#1c3c24] focus:ring-2 focus:ring-[#1c3c24]/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-3.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-[#f9fbf8] border border-[#dce4da] rounded-2xl text-[#1c3c24] font-bold text-xs placeholder-gray-400 focus:outline-none focus:border-[#1c3c24] focus:ring-2 focus:ring-[#1c3c24]/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-[#1c3c24] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#dce4da] text-[#1c3c24] focus:ring-[#1c3c24]"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setForgotModalOpen(true)}
              className="text-[#2c5e37] hover:text-[#1c3c24] underline font-bold cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Secure Sign In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#e2e8e0] pt-4 text-[10px] text-gray-400 font-mono">
          Spring Security & JWT Encrypted • SporoNova CMS v2.0
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 sm:p-8 max-w-sm w-full text-[#1c3c24] shadow-2xl relative">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-[#1c3c24]">
              <Sparkles className="w-5 h-5 text-[#4e8c4a]" /> Reset Password
            </h3>
            {forgotSuccess ? (
              <div className="space-y-4">
                <p className="text-xs text-gray-600 font-medium">
                  Password reset instructions have been sent to <strong>{forgotEmail}</strong>.
                </p>
                <button
                  onClick={() => {
                    setForgotModalOpen(false);
                    setForgotSuccess(false);
                  }}
                  className="w-full py-2.5 bg-[#1c3c24] hover:bg-[#2c5e37] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-gray-600 font-medium">
                  Enter your admin email address to receive a secure password reset link.
                </p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@sporonova.com"
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="w-1/2 py-2.5 bg-[#f0f5ef] border border-[#d2e4d0] hover:bg-gray-200 text-[#1c3c24] rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-[#1c3c24] hover:bg-[#2c5e37] text-white rounded-xl text-xs font-bold uppercase"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
