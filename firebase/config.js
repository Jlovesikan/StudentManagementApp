import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyASUZnZJywcBopRjNKVFnFq8voaHUkLTY4",
  authDomain: "student-management-app-9385a.firebaseapp.com",
  projectId: "student-management-app-9385a",
  storageBucket: "student-management-app-9385a.firebasestorage.app",
  messagingSenderId: "792931153260",
  appId: "1:792931153260:web:e6a29879f877875f8d6f49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);