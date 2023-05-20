import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider, signInWithPopup, signOut } from '../NavBar/firebase.js';

function SignInWithGoogle() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const { displayName, email, photoURL } = user;
        setUser({ displayName, email, photoURL });
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signIn = () => {
    signInWithPopup(auth, googleAuthProvider).catch((error) => {
      // Handle Errors here.
      console.error(error);
    });
  };

  return (
    <div>
      { user ? (
          <div>
            <h1>Welcome, {user.displayName}</h1>
            <img src={user.photoURL} alt={user.displayName} />
            <p>{user.email}</p>
            <button onClick={() => signOut(auth)}>
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={signIn}>
            Sign In with Google
          </button>
        )
      }
    </div>
  );
}

export default SignInWithGoogle;
