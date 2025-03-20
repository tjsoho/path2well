"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001618] px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-[#001618] border-2 border-[#4ECDC4]/20 shadow-lg shadow-[#4ECDC4]/10 rounded-md px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-3xl font-bold text-white mb-6 tracking-wider">
            Admin Login
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-900/20 text-red-400 border border-red-500/20 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-[#4ECDC4] text-sm mb-2 tracking-wide"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#001618] border-2 border-[#4ECDC4]/20 rounded-md 
                       text-white placeholder-[#4ECDC4]/50
                       focus:outline-none focus:border-[#4ECDC4]/50 focus:ring-1 focus:ring-[#4ECDC4]/50
                       transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-[#4ECDC4] text-sm mb-2 tracking-wide"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#001618] border-2 border-[#4ECDC4]/20 rounded-md 
                       text-white placeholder-[#4ECDC4]/50
                       focus:outline-none focus:border-[#4ECDC4]/50 focus:ring-1 focus:ring-[#4ECDC4]/50
                       transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4ECDC4] text-[#001618] py-3 rounded-md 
                     hover:bg-[#4ECDC4]/90 transition-colors disabled:opacity-50
                     text-lg font-semibold tracking-wider"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
