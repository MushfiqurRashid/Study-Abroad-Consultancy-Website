import type { Metadata } from "next";
import { Toaster } from "@/components/admin/ui/toaster";

export const metadata: Metadata = {
  title: "Admin | Study Abroad Consultancy",
  description: "Administration dashboard for Study Abroad Consultancy",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="admin-shell min-h-screen bg-background text-foreground">
      {children}
      <Toaster />
    </div>
  );
}
