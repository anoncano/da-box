'use client';
import { Spinner } from 'flowbite-react';
import useAdminGuard from '@/hooks/useAdminGuard';

export default function AdminPage() {
  const loading = useAdminGuard();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin dashboard</h1>
      {/* user-management UI goes here */}
    </div>
  );
}
