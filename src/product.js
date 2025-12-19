import { db, storage } from "./firebase.js";
import { push, ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import {
  uploadBytes,
  getDownloadURL,
  ref as sRef
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

export async function addProduct(data) {
  const p = push(ref(db, "products"));
  const pid = p.key;

  const imgRef = sRef(storage, `products/${pid}.jpg`);
  await uploadBytes(imgRef, data.imageFile);
  const imageUrl = await getDownloadURL(imgRef);

  await set(p, {
    name: data.name,
    description: data.description,
    price: data.price,
    imageUrl,
    merchantUid: data.merchantUid,
    merchantName: data.merchantName,
    status: "on_sale"
  });
}
