import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import { maxMedias } from 'styles/breakpoints';

function HeaderNav({ mobileVisible, onClose, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (mobileVisible) {
        onClose();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [mobileVisible]);

  return (
    <Flex
      alignItems="center"
      bg="background"
      ref={ref}
      sx={{
        [maxMedias[0]]: {
          display: mobileVisible ? 'flex' : 'none',
          position: 'fixed',
          top: 70,
          left: 0,
          bottom: 0,
          right: 0,
          px: 28,
          py: 20,
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderTopWidth: 1,
          borderTopStyle: 'solid',
          borderTopColor: 'border2'
        }
      }}
      {...rest}
    />
  );
}

HeaderNav.propTypes = {
  mobileVisible: PropTypes.bool,
  onClose: PropTypes.func
};

export default HeaderNav;
