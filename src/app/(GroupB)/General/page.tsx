// src/app/(GroupA)/admin/page.tsx
"use client";
import LogoutButton from '@/app/UI/LogoutButton';
import ErrorReportFab from '@/app/UI/ErrorReportFab';
import DeleteAccountFab from '@/app/UI/DeleteAccountFab';

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
