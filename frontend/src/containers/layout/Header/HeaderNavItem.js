import React from 'react';
import { Text } from 'rebass';

function HeaderNavItem({ ...rest }) {
  return <Text variant="headerlink" mr={[0, 33]} mb={[18, 0]} {...rest} />;
}

export default HeaderNavItem;
