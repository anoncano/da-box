// src/lib/firebase.ts
import { initializeApp }   from "firebase/app";
import { getAuth }         from "firebase/auth";
import { getFirestore }    from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyCauE6JDoYpwBcnVchJowtZETZvdmJ98O0",
  authDomain:        "da-box-82798.firebaseapp.com",
  projectId:         "da-box-82798",
  storageBucket:     "da-box-82798.appspot.com",   // ← include .appspot.com
  messagingSenderId: "425425271710",
  appId:             "1:425425271710:web:a3c4246e4716ceeac2748f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
