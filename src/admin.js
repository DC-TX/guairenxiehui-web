import { db } from "./firebase.js";
import { update, ref } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

export async function approveMerchant(uid, requestId) {
  await update(ref(db, `users/${uid}`), {
    role: "merchant",
    merchantStatus: "approved"
  });

  await update(ref(db, `merchant_requests/${requestId}`), {
    status: "approved"
  });
}
