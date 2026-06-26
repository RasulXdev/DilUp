import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Müəllim qeydiyyatı" };

export default function TutorRegisterPage() {
  return <RegisterForm variant="tutor" />;
}
