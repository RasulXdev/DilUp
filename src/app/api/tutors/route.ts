import { NextResponse } from "next/server";
import { tutors as mockTutors } from "@/lib/tutors";
import { getTutors } from "@/lib/tutors/db";

export async function GET() {
  const dbTutors = await getTutors();
  return NextResponse.json(dbTutors.length > 0 ? dbTutors : mockTutors);
}
