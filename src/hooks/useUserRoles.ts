// src/hooks/useUserRoles.ts
"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export type Roles = {
  admin?: boolean;
  chatAdmin?: boolean;
  subAdmin?: boolean;
};

export default function useUserRoles(): [Roles, boolean] {
  const [roles, setRoles]   = useState<Roles>({});
  const [loading, setLoad]  = useState(true);

  useEffect(() => {
    // wait for auth to know who’s logged in
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setRoles({});
        setLoad(false);
        return;
      }

      // live listener on that user doc
      const unsubDoc = onSnapshot(
        doc(db, "users", user.uid),
        (snap) => {
          setRoles((snap.data() || {}) as Roles);
          setLoad(false);
        },
        () => setLoad(false) // on error
      );

      // cleanup when user logs out
      return () => unsubDoc();
    });

    return () => unsubAuth();
  }, []);

  return [roles, loading];
}
