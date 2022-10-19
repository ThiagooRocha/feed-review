import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvkno_Vc0TX24Sn-RPvXAR6fpJMbZI6s8",
  authDomain: "feedreview-80fd0.firebaseapp.com",
  projectId: "feedreview-80fd0",
  storageBucket: "feedreview-80fd0.appspot.com",
  messagingSenderId: "281699513102",
  appId: "1:281699513102:web:f0168bb5cf79dda3689d5f"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };