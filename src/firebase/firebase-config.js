import { getAuth } from "firebase/auth";
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
