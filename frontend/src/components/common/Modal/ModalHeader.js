import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'rebass';

const ModalHeader = ({ onClose, display, ...props }) => (
  <Box
    display={display}
    sx={{
      position: 'relative',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: ['divider', 'transparent']
    }}
  >
    <Text variant="modalheader" textAlign="center" {...props} />
    {onClose && (
      <Text
        as="i"
        className="far fa-long-arrow-left"
        fontSize="24px"
        color="gray"
        display={['block', 'none']}
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          left: 20,
          top: 27
        }}
        onClick={onClose}
      />
    )}
    {onClose && (
      <Text
        as="i"
        className="far fa-times"
        fontSize="24px"
        color="gray"
        display={['none', 'block']}
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          right: 20,
          top: 20
        }}
        onClick={onClose}
      />
    )}
  </Box>
);

ModalHeader.propTypes = {
  onClose: PropTypes.func,
  display: PropTypes.any
};

export default ModalHeader;
