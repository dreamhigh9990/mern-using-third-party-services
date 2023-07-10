import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Text } from 'rebass';

const MobileHeader = ({ backLink, ...props }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 3,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: ['divider', 'transparent']
    }}
    display={['block', 'none']}
    bg="background"
  >
    <Text variant="modalheader" textAlign="center" {...props} />
    <Text
      className="far fa-long-arrow-left"
      fontSize="18px"
      color="gray"
      as={Link}
      to={backLink}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        left: 20,
        top: 27
      }}
    />
  </Box>
);

MobileHeader.propTypes = {
  backLink: PropTypes.string
};

export default MobileHeader;
