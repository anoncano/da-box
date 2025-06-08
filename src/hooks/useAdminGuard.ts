"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserRoles from "@/hooks/useUserRoles";

export default function useAdminGuard() {
  const [roles, loading] = useUserRoles();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!roles.admin) router.replace("/general"); // non-admins go away
  }, [loading, roles, router]);

  return loading;         // so page can show spinner
}
