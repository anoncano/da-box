'use client';
import { signOut } from 'firebase/auth';
import { Button } from 'flowbite-react';
import { auth } from '@/lib/firebase';

export default function LogoutButton() {
  return (
    <Button size="sm" onClick={() => signOut(auth)}>
      Log out
    </Button>
  );
}
