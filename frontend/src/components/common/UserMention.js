import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'rebass';

function UserMention({ user, ...props }) {
  return (
    <Text variant="username" as="span" {...props}>
      {user ? user.name : 'Anonymous'}
    </Text>
  );
}

UserMention.propTypes = {
  user: PropTypes.object
};

export default UserMention;
