'use client';

import { Suspense } from 'react';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  doc, getDoc, setDoc, updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from "@/lib/firebase"
import { Button, TextInput, Alert, Spinner } from 'flowbite-react';
import useUserRoles from '@/hooks/useUserRoles';

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}

function AuthForm() {
  const router          = useRouter();
  const params          = useSearchParams();
  const inviteToken     = params.get('token');               // ?token=abc
  const [mode, setMode] = useState<'login' | 'register' | null>(null);

  const [email, setEmail] = useState('');
  const [pass,  setPass]  = useState('');
  const [err,   setErr]   = useState('');
  const [busy,  setBusy]  = useState(false);

  const [roles, loadRoles] = useUserRoles();

  /* auto-redirect if already logged in */
  useEffect(() => {
    if (loadRoles) return;
    if (!auth.currentUser) return;
    if (roles.admin)       router.replace('/admin');
    else if (roles.chatAdmin) router.replace('/chat');
    else                    router.replace('/general');
  }, [loadRoles, roles, router]);

  /* decide login vs register based on token */
  useEffect(() => {
    (async () => {
      if (!inviteToken) { setMode('login'); return; }
      const snap = await getDoc(doc(db, 'inviteTokens', inviteToken));
      setMode(snap.exists() && !(snap.data() as any).used ? 'register' : 'login');
    })();
  }, [inviteToken]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      if (mode === 'register') {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        await setDoc(doc(db, 'users', cred.user.uid), {
          email,
          admin: false, chatAdmin: false, subAdmin: false,
          createdAt: serverTimestamp(),
        });
        await updateDoc(doc(db, 'inviteTokens', inviteToken!), {
          used: true, usedBy: cred.user.uid, usedAt: serverTimestamp(),
        });
        router.replace('/auth');                 // back to login
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
        router.refresh();                        // let role hook redirect
      }
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (mode === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-xl font-bold text-center">
          {mode === 'register' ? 'Create account' : 'Sign in'}
        </h1>

        {err && <Alert color="failure">{err}</Alert>}

        {mode === 'register' && (
          <TextInput
            placeholder="invite token"
            value={inviteToken || ''}
            readOnly
          />
        )}

        <TextInput
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />

        <Button
          onClick={submit}
          disabled={busy}
          className="w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {busy && <Spinner size="sm" />}
          {mode === 'register' ? 'Register' : 'Login'}
        </Button>

        {!inviteToken && (
          <p className="text-sm text-gray-500 text-center">
            Need access? Ask an admin for an invite link.
          </p>
        )}
      </div>
    </main>
  );
}
