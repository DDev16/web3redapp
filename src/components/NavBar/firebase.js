import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABnlCJBkqY4Yaoba1iUh6K_kLLOO9vvaQ",
  authDomain: "web3realty-5fc60.firebaseapp.com",
  projectId: "web3realty-5fc60",
  storageBucket: "web3realty-5fc60.appspot.com",
  messagingSenderId: "981496895689",
  appId: "1:981496895689:web:bf5dd6a8af3c518c6f1518",
  measurementId: "G-488NPT56MB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider, signInWithPopup, signOut };
