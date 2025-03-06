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
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-kiona text-brand-brown-dark mb-6">
            Admin Login
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-brand-brown-dark text-sm mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-brand-brown-dark text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-brown-dark text-brand-cream py-2 rounded-md hover:bg-brand-brown-dark/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
