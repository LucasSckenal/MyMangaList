import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIoOezY2iKKZUQYWkQcaG8UR1v-f4glCQ",
  authDomain: "mymangalist-8ce8b.firebaseapp.com",
  projectId: "mymangalist-8ce8b",
  storageBucket: "mymangalist-8ce8b.appspot.com",
  messagingSenderId: "994373716992",
  appId: "1:994373716992:web:1c337c8a7b09b22d9adce5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
