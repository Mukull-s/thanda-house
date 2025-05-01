import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-XUkGX6FZVnU4rZNJX3j-Gpm0HvNZwOU",
  authDomain: "thandahouse-13ff3.firebaseapp.com",
  projectId: "thandahouse-13ff3",
  storageBucket: "thandahouse-13ff3.appspot.com",
  messagingSenderId: "640387008694",
  appId: "1:640387008694:web:20ee5221f3dfbf718fbe17",
  measurementId: "G-FR7DBF563G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 