"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const HEARTBEAT_INTERVAL_MS = 45_000;

/** Mounted site-wide. While a logged-in tutor has the site open, pings /api/presence so profiles.is_online/last_seen_at stay fresh. */
export function TutorPresenceBeacon() {
  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | undefined;

    function ping() {
      fetch("/api/presence", { method: "POST", keepalive: true }).catch(() => {});
    }

    function goOffline() {
      fetch("/api/presence", { method: "DELETE", keepalive: true }).catch(() => {});
    }

    async function start() {
      const { data } = await supabase.auth.getUser();
      if (cancelled || !data.user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (cancelled || profile?.role !== "tutor") return;

      ping();
      interval = setInterval(ping, HEARTBEAT_INTERVAL_MS);
      window.addEventListener("pagehide", goOffline);
    }

    start();

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
      window.removeEventListener("pagehide", goOffline);
    };
  }, []);

  return null;
}
