"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserRoles from "@/hooks/useUserRoles";
import { auth } from "@/lib/firebase";

export default function useAdminGuard() {
  const [roles, loading] = useUserRoles();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!auth.currentUser) {
      router.replace('/auth');
    } else if (!roles.admin) {
      router.replace('/general');
    }
  }, [loading, roles, router]);

  return loading;         // so page can show spinner
}
