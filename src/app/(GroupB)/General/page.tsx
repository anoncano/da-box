// src/app/(GroupA)/admin/page.tsx
"use client";
import LogoutButton from '@/components/LogoutButton';
import ErrorReportFab from '@/components/ErrorReportFab';
import DeleteAccountFab from '@/components/DeleteAccountFab';

export default function GeneralPage() {
  return (
    <div style={{ padding: 32 }} className="flex flex-col gap-4">
      <LogoutButton />
      <div>✅ General works</div>
      <ErrorReportFab />
      <DeleteAccountFab />
    </div>
  );
}
