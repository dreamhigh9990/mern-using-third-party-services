import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'rebass';

function LoadingContainer({ children, loading, ...rest }) {
  const boxProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 1,
    minHeight: '200px',
    ...rest
  };

  if (loading) {
    return (
      <Box {...boxProps}>
        <Text as="i" fontSize="20px" className="far fa-circle-notch fa-spin" />
      </Box>
    );
  }

  if (typeof children === 'function') {
    return children();
  }

  return children;
}

LoadingContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  loading: PropTypes.bool
};

LoadingContainer.defaultProps = {
  children: null
};

export default LoadingContainer;
