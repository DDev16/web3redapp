import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider, signInWithPopup, signOut } from '../NavBar/firebase.js';
import UserListings from '../User/UserListings.js';
import UserRentals from '../User/UserRentals.js';
import UserProfile from '../User/UserProfile.js';
import UserSavedSearches from '../User/UserSavedSearches.js';
import Inbox from '../User/Inbox.js';
import Favorites from '../User/UserFavorites.js';
import CreateListing from '../User/CreateListing.js';
import UserContext from '../Utils/UserContext.js';
import UserAvatar from '../User/UserAvatar.js';
import { FaHome, FaCar, FaUser, FaBookmark, FaEnvelope, FaHeart, FaPlus } from 'react-icons/fa';

function SignInWithGoogle() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('listings');

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'listings':
        return <UserListings user={user} />;
      case 'rentals':
        return <UserRentals user={user} />;
      case 'profile':
        return <UserProfile user={user} />;
      case 'saved-searches':
        return <UserSavedSearches user={user} />;
      case 'inbox':
        return <Inbox user={user} />;
      case 'favorites':
        return <Favorites user={user} />;
      case 'create-listing':
        return <CreateListing user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <UserContext.Provider value={user}>
          <div className="sidebar">
            <h2 className="welcome-message">Welcome to your Dashboard, {user.displayName}!</h2>
            <UserAvatar user={user} className="user-avatar" />

            <div className="sidebar-menu">
              <ul>
                <li>
                  <button
                    className={`menu-item ${activeTab === 'listings' ? 'active' : ''}`}
                    onClick={() => handleTabChange('listings')}
                  >
                    <FaHome className="menu-icon" />
                    Listings
                  </button>
                </li>
                <li>
                  <button
                    className={`menu-item ${activeTab === 'rentals' ? 'active' : ''}`}
                    onClick={() => handleTabChange('rentals')}
                  >
                    <FaCar className="menu-icon" />
                    Rentals
                  </button>
                </li>
                <li>
                  <button
                    className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => handleTabChange('profile')}
                  >
                    <FaUser className="menu-icon" />
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className={`menu-item ${activeTab === 'saved-searches' ? 'active' : ''}`}
                    onClick={() => handleTabChange('saved-searches')}
                  >
                    <FaBookmark className="menu-icon" />
                    Saved Searches
                  </button>
                </li>
                <li>
                  <button
                    className={`menu-item ${activeTab === 'inbox' ? 'active' : ''}`}
                    onClick={() => handleTabChange('inbox')}
                  >
                    <FaEnvelope className="menu-icon" />
                    Inbox
                  </button>
                </li>
                <li>
                  <button
                    className={`menu-item ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => handleTabChange('favorites')}
                  >
                    <FaHeart className="menu-icon" />
                    Favorites
                  </button>
                </li>
                <li>
                  <button
                    className={`menu-item ${activeTab === 'create-listing' ? 'active' : ''}`}
                    onClick={() => handleTabChange('create-listing')}
                  >
                    <FaPlus className="menu-icon" />
                    Create Listing
                  </button>
                </li>
              </ul>
            </div>

            <button className="sign-out-btn" onClick={() => signOut(auth)}>Sign Out</button>
          </div>

          <div className="content">{renderActiveTab()}</div>
        </UserContext.Provider>
      ) : (
        <button className="sign-in-btn" onClick={signIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default SignInWithGoogle;
