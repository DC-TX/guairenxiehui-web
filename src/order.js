import { db } from "./firebase.js";
import {
  ref,
  get,
  update,
  push,
  set
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

export async function buyProduct(uid, productId) {
  const userRef = ref(db, `users/${uid}`);
  const prodRef = ref(db, `products/${productId}`);

  const u = await get(userRef);
  const p = await get(prodRef);

  if (u.val().points < p.val().price) throw "积分不足";

  await update(userRef, { points: u.val().points - p.val().price });

  const o = push(ref(db, "orders"));
  await set(o, {
    uid,
    productId,
    price: p.val().price
  });
}
