import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlrBlzRDtWOT6tBsV84XP1UI9ii2dZ5Kk",
  authDomain: "otp-auth-domconnect.firebaseapp.com",
  projectId: "otp-auth-domconnect",
  storageBucket: "otp-auth-domconnect.firebasestorage.app",
  messagingSenderId: "741389482451",
  appId: "1:741389482451:web:7dacf1098fefa7779e9726",
  measurementId: "G-YZXWQCCMLL",
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = typeof window !== "undefined" ? getAuth(app) : null;

export default defineNuxtPlugin(() => {
  return {
    provide: {
      firebaseApp: app,
      firebaseAnalytics: analytics,
      firebaseAuth: auth,
    },
  };
});
