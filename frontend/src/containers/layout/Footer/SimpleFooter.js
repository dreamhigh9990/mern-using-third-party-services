import React from 'react';
import { Flex } from 'rebass';
import { MagicLink } from 'components/common';
import { SIMPLE_FOOTER } from './footer-links';

function SimpleFooter() {
  return (
    <Flex
      width={1}
      sx={{
        borderTopColor: 'divider',
        borderTopWidth: 1,
        borderTopStyle: 'solid'
      }}
      bg="background"
      py={50}
      alignItems="center"
      justifyContent="center"
    >
      {SIMPLE_FOOTER.map(link => (
        <MagicLink key={link.children} variant="footerlink" mx={20} {...link} />
      ))}
    </Flex>
  );
}

export default SimpleFooter;
