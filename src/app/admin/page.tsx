"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AdminAuth } from "@/components/auth/AdminAuth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Session } from "@supabase/supabase-js";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session ? <AdminDashboard /> : <AdminAuth />;
}
