import React from 'react';
import PropTypes from 'prop-types';

const Inbox = ({ user }) => (
  <div>
    <h2>Inbox</h2>
    {/* Code to display user's inbox */}
  </div>
);

Inbox.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Inbox;
