'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import useUserRoles from '@/hooks/useUserRoles';

export default function HomePage() {
  const router = useRouter();
  const [roles, loading] = useUserRoles();

  useEffect(() => {
    if (loading) return;
    if (!auth.currentUser) router.replace('/auth');
    else if (roles.admin) router.replace('/admin');
    else if (roles.chatAdmin) router.replace('/chat');
    else router.replace('/general');
  }, [loading, roles, router]);

  return null;
}
