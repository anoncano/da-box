'use client';
// @ts-nocheck
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react';
import { auth } from '@/lib/firebase';
import { deleteUser } from 'firebase/auth';

export default function DeleteAccountFab() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const confirm = async () => {
    if (!auth.currentUser) return;
    setBusy(true);
    try {
      await deleteUser(auth.currentUser);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Button
        color="failure"
        className="fixed bottom-4 left-4 rounded-full"
        onClick={() => setOpen(true)}
      >
        Delete Account
      </Button>
      <Modal show={open} onClose={() => setOpen(false)}>
        <ModalHeader>Delete Account</ModalHeader>
        <ModalBody>
          {err && <div className="text-red-600 mb-2">{err}</div>}
          <p>Are you sure? This cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="failure" onClick={confirm} disabled={busy}>
            Yes, delete
          </Button>
          <Button color="gray" onClick={() => setOpen(false)} disabled={busy}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
