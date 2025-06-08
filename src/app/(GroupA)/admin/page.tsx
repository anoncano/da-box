'use client';
import { Spinner } from 'flowbite-react';
import LogoutButton from '@/app/UI/LogoutButton';
import ErrorReportFab from '@/app/UI/ErrorReportFab';
import DeleteAccountFab from '@/app/UI/DeleteAccountFab';
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
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Admin dashboard</h1>
      <div>
        <LogoutButton />
      </div>
      {/* user-management UI goes here */}
      <ErrorReportFab />
      <DeleteAccountFab />
    </div>
  );
}
