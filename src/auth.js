import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

export async function register(email, password, username) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const uid = res.user.uid;

  await set(ref(db, `users/${uid}`), {
    email,
    username,
    role: "user",
    points: 100,
    merchantStatus: "none"
  });
}

export async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}
