import React from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ user }) => (
  <div>
    <h2>Your Profile</h2>
    <p>Name: {user.displayName}</p>
    <p>Email: {user.email}</p>
  </div>
);

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfile;
