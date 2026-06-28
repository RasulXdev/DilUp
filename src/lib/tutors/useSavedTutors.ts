"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "dilup_saved_tutors";

function readSavedTutors() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function useSavedTutors() {
  const [savedIds, setSavedIds] = useState<string[]>(readSavedTutors);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  return useMemo(
    () => ({
      savedIds,
      isSaved: (id: string) => savedIds.includes(id),
      toggleSaved: (id: string) =>
        setSavedIds((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        ),
    }),
    [savedIds],
  );
}
