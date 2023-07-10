import React from 'react';
import { Flex } from 'rebass';

const FluidContainer = props => {
  return (
    <Flex
      flexDirection="column"
      maxWidth={1075}
      width={[1, 'initial']}
      mx="auto"
      px={28}
      {...props}
    />
  );
};

export default FluidContainer;
