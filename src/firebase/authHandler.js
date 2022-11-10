import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";

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
