// SignInWithGoogle.js
import React, { useState, useEffect, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
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
import { FaHome, FaCar, FaUser, FaBookmark, FaEnvelope, FaHeart, FaPlus, FaBars } from 'react-icons/fa';

function SignInWithGoogle() {
  const user = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('listings');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {user ? (
        <>
          {isMobile && (
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
              <FaBars />
            </button>
          )}

          <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
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
        </>
      ) : (
        <button className="sign-in-btn" onClick={signIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default SignInWithGoogle;
