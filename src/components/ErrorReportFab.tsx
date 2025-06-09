'use client';
// @ts-nocheck
import { useState } from 'react';
import { Button, Modal, Textarea, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react';
import { auth, db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function ErrorReportFab() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const submit = async () => {
    await addDoc(collection(db, 'errorReports'), {
      uid: auth.currentUser?.uid || null,
      message: msg,
      createdAt: serverTimestamp(),
    });
    setMsg('');
    setOpen(false);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full"
        color="light"
        onClick={() => setOpen(true)}
      >
        Report Issue
      </Button>
        <Modal show={open} onClose={() => setOpen(false)}>
          <ModalHeader>Report a problem</ModalHeader>
          <ModalBody>
            <Textarea
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Describe the issue"
              rows={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={submit} disabled={!msg.trim()}>
              Submit
            </Button>
            <Button color="gray" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
    </>
  );
}
