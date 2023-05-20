import React from 'react';
import PropTypes from 'prop-types';

const UserListings = ({ user }) => (
  <div>
    <h2>Your Listings</h2>
    {/* Code to display user's listings */}
  </div>
);

UserListings.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserListings;
