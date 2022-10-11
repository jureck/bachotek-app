import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD-R7ivvMXDQQv2hpDJUDSZOdh8TUxxTvo",
  authDomain: "bachotek-15b21.firebaseapp.com",
  projectId: "bachotek-15b21",
  storageBucket: "bachotek-15b21.appspot.com",
  messagingSenderId: "217383267601",
  appId: "1:217383267601:web:03c04348219309fd4ff0b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);