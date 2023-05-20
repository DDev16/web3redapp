import React from 'react';
import PropTypes from 'prop-types';

const UserRentals = ({ user }) => (
  <div>
    <h2>Your Rentals</h2>
    {/* Code to display user's rentals */}
  </div>
);

UserRentals.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserRentals;
