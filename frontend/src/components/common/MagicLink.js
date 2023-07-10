import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from 'rebass';

function MagicLink({ to, href, ...rest }) {
  let as = 'span';
  if (to) {
    as = Link;
  } else if (href) {
    as = 'a';
  }

  return <Text as={as} to={to} href={href} {...rest} />;
}

MagicLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string
};

export default MagicLink;
