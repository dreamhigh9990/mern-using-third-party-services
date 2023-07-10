import React from 'react';
import { Box, Text, Flex } from 'rebass';
import { FluidContainer, MagicLink } from 'components/common';
import FOOTER_LINKS from './footer-links';

function HomeFooter() {
  return (
    <Box
      width={1}
      sx={{
        borderTopColor: 'divider',
        borderTopWidth: 1,
        borderTopStyle: 'solid'
      }}
    >
      <FluidContainer
        pt={50}
        pb={100}
        flexDirection={['column', 'row']}
        alignItems={['center', 'flex-start']}
      >
        {FOOTER_LINKS.map(group => (
          <Flex key={group.title} flexDirection="column" flex={1}>
            <Text fontWeight="bold" mb={10}>
              {group.title}
            </Text>
            {group.links.map(link => (
              <MagicLink key={link.children} variant="footerlink" {...link} />
            ))}
          </Flex>
        ))}
      </FluidContainer>
    </Box>
  );
}

export default HomeFooter;
