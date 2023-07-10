import React from 'react';
import PropTypes from 'prop-types';
import { LoadingContainer } from 'components/common';

function LoadingOverlay({ loading }) {
  return (
    <LoadingContainer
      loading={loading}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        bg: 'background'
      }}
    />
  );
}

LoadingOverlay.propTypes = {
  loading: PropTypes.bool
};

export default LoadingOverlay;
