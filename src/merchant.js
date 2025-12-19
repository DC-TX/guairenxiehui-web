import { db } from "./firebase.js";
import {
  push,
  ref,
  update
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

export async function applyMerchant(uid, username, reason) {
  const r = push(ref(db, "merchant_requests"));
  await update(r, {
    uid,
    username,
    reason,
    status: "pending"
  });

  await update(ref(db, `users/${uid}`), {
    merchantStatus: "pending"
  });
}
