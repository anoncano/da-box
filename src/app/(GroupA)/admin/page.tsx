'use client';
import { Spinner } from 'flowbite-react';
import LogoutButton from '@/components/LogoutButton';
import ErrorReportFab from '@/components/ErrorReportFab';
import DeleteAccountFab from '@/components/DeleteAccountFab';
import useAdminGuard from '@/hooks/useAdminGuard';
import UserManagement from './UserManagement';

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
      <UserManagement />
      <ErrorReportFab />
      <DeleteAccountFab />
    </div>
  );
}
