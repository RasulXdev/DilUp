import { NextResponse } from "next/server";
import { getTutors } from "@/lib/tutors/db";

export async function GET() {
  const dbTutors = await getTutors();
  return NextResponse.json(dbTutors);
}
