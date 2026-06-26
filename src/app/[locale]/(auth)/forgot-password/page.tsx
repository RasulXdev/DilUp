import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Şifrəni unutdum" };

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
