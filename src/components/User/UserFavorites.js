import React from 'react';
import PropTypes from 'prop-types';

const Favorites = ({ user }) => (
  <div>
    <h2>Favorites</h2>
    {/* Code to display user's favorite listings */}
  </div>
);

Favorites.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Favorites;
