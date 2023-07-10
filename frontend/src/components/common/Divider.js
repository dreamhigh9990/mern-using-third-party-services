import React from 'react';
import { Box } from 'rebass';

function Divider(props) {
  return <Box bg="divider" width={1} height={1} minHeight={1} {...props} />;
}

export default Divider;
