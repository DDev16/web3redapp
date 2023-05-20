import React from 'react';
import PropTypes from 'prop-types';

const UserSaveSearches = ({ user }) => (
  <div>
    <h2>Saved Searches</h2>
    {/* Code to display user's saved searches */}
  </div>
);

UserSaveSearches.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserSaveSearches;
