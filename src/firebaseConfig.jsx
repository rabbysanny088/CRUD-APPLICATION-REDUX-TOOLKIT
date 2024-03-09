import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAl238r7u1MTRxwx8WeqVz81MO9v4YYrr0",
  authDomain: "data-authentication-9a0ed.firebaseapp.com",
  projectId: "data-authentication-9a0ed",
  storageBucket: "data-authentication-9a0ed.appspot.com",
  messagingSenderId: "83236329631",
  appId: "1:83236329631:web:6e0538aad08af89aae2aaa"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const storage = getStorage();

export { auth, storage };
