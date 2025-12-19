import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzIUyu2Oj0nGgkc6h3qnS6DQkkxsBxzu8",
  authDomain: "guairenxiehui-e3d59.firebaseapp.com",
  databaseURL: "https://guairenxiehui-e3d59-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "guairenxiehui-e3d59",
  storageBucket: "guairenxiehui-e3d59.firebasestorage.app",
  messagingSenderId: "570598758945",
  appId: "1:570598758945:web:5321c2f2d7dd4a7d9fa160"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
