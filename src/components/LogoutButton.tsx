'use client';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import { auth } from '@/lib/firebase';

export default function LogoutButton() {
  const router = useRouter();
  const doLogout = async () => {
    await signOut(auth);
    router.replace('/Auth');
  };

  return (
    <Button size="sm" onClick={doLogout}>
      Log out
    </Button>
  );
}
