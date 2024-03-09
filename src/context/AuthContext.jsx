import { message } from "antd";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createContext, useEffect, useState } from "react";
import { auth, storage } from "../firebaseConfig";


export const AuthContextProvider = createContext({
  user: null,
  isLoading: false,
});

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");

  const [file, setFile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isLoggedIn = !!user;

  const SigninAuth = async (email, password) => {
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName, displayEmail);
      console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const l = await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
              displayEmail,
            });
            console.log(l);
          });
        }
      );
    } catch (error) {
      if (error.code === "auth/weak-password") {
        message.error("Password should be at least 6 characters");
      } else if (error.code === "auth/email-already-in-use") {
        message.error("Email is already in use");
      }
      console.error("Error during sign up:", error.message);
    }
  };

  const LoginAuth = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        message.error(
          "Invalid credentials. Please check your email and password."
        );
      } else {
        console.error("Error during login:", error.message);
      }
    }
  };

  const LogOutAuth = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    isLoading,
    SigninAuth,
    LogOutAuth,
    LoginAuth,
    error,
    isLoggedIn,
    displayName,
    setDisplayName,
    setFile,
    file,
    displayEmail,
    setDisplayEmail
  };

  return (
    <AuthContextProvider.Provider value={value}>
      {!isLoading && children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
