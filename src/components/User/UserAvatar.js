import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

const UserAvatar = ({ user }) => (
  <Tooltip title={user.displayName}>
    <Avatar alt={user.displayName} src={user.photoURL} />
  </Tooltip>
);

UserAvatar.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
};

export default UserAvatar;
