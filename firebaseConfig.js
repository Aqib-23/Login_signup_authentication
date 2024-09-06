import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBvrC81naL2K6309eThmS46pNzf7LBX6ZM",
  authDomain: "authuntication-b32e0.firebaseapp.com",
  projectId: "authuntication-b32e0",
  storageBucket: "authuntication-b32e0.appspot.com",
  messagingSenderId: "88342794561",
  appId: "1:88342794561:web:02646076278432290e91c0",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { auth };

