import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider, signInWithPopup, signOut } from '../NavBar/firebase.js';
import UserListings from '../User/UserListings.js';
import UserRentals from '../User/UserRentals.js';
import UserProfile from '../User/UserProfile.js';
import UserSavedSearches from '../User/UserSavedSearches.js';
import Inbox from '../User/Inbox.js';
import Favorites from '../User/UserFavorites.js';
import CreateListing from '../User/CreateListing.js';   

function SignInWithGoogle() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        setUser({ displayName, email, photoURL });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = () => {
    signInWithPopup(auth, googleAuthProvider).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      { user ? (
        <div>
          <CreateListing user={user} />
          <UserListings user={user} />
          <UserRentals user={user} />
          <UserProfile user={user} />
          <Inbox user={user} />
          <Favorites user={user} />
          <UserSavedSearches user={user} />

          <button onClick={() => signOut(auth)}>
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={signIn}>
          Sign In with Google
        </button>
      )}
    </div>
  );
}

export default SignInWithGoogle;
