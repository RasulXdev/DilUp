"use client";

import { useQuery } from "@tanstack/react-query";
import type { Tutor } from "@/lib/tutors";

async function fetchTutors() {
  const response = await fetch("/api/tutors");
  if (!response.ok) {
    throw new Error("Unable to load tutors");
  }
  return (await response.json()) as Tutor[];
}

export function useTutorsQuery(initialData: Tutor[]) {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: fetchTutors,
    initialData,
  });
}
