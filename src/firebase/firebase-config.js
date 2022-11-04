import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBIVmIt65xkyT2Nt3_Eeg-coFFILxZN2ZU",
  authDomain: "moon-5863d.firebaseapp.com",
  projectId: "moon-5863d",
  storageBucket: "moon-5863d.appspot.com",
  messagingSenderId: "804491469644",
  appId: "1:804491469644:web:49460cad3b1cd43b0a25e9",
};

// Initialize Firebase app & database
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

//functions for firebase authentication //
export function signUpFB(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logOutFB() {
  return signOut(auth);
}

export function logInFB(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

//Custom Hook to return CurrentUser

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export function retUserID() {
  return auth.currentUser.uid;
}
