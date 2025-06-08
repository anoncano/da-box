'use client';

import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, updateDoc, writeBatch } from 'firebase/firestore';
import { Table, Button } from 'flowbite-react';
const TableHead = (Table as any).Head;
const TableHeadCell = (Table as any).HeadCell;
const TableBody = (Table as any).Body;
const TableRow = (Table as any).Row;
const TableCell = (Table as any).Cell;
import { db } from '@/lib/firebase';

export type UserRecord = {
  id: string;
  email?: string;
  subAdmin?: boolean;
  chatAdmin?: boolean;
};

export default function UserManagement() {
  const [users, setUsers] = useState<UserRecord[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'users'), snap => {
      setUsers(
        snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }))
      );
    });
    return unsub;
  }, []);

  const toggleSub = async (u: UserRecord) => {
    await updateDoc(doc(db, 'users', u.id), { subAdmin: !u.subAdmin });
  };

  const makeChatAdmin = async (u: UserRecord) => {
    const batch = writeBatch(db);
    users.forEach(x => {
      batch.update(doc(db, 'users', x.id), { chatAdmin: x.id === u.id });
    });
    await batch.commit();
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <Table>
        <TableHead>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Sub-admin</TableHeadCell>
          <TableHeadCell>Chat admin</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {users.map(u => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.email || u.id}</TableCell>
              <TableCell>
                <Button size="xs" onClick={() => toggleSub(u)}>
                  {u.subAdmin ? 'Revoke' : 'Grant'}
                </Button>
              </TableCell>
              <TableCell>
                <Button size="xs" color={u.chatAdmin ? 'success' : 'gray'} onClick={() => makeChatAdmin(u)}>
                  {u.chatAdmin ? 'Current' : 'Make'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
