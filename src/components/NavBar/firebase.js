import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8VRjbUjTqZ5bQSByAlD6LVjH5CBhY94o",
  authDomain: "fir-8a934.firebaseapp.com",
  projectId: "fir-8a934",
  storageBucket: "fir-8a934.appspot.com",
  messagingSenderId: "388793773429",
  appId: "1:388793773429:web:7004e6c318192db689773c",
  measurementId: "G-QK73T28T32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider, signInWithPopup, signOut };
