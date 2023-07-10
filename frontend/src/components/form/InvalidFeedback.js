import React from 'react';
import { Text } from 'rebass';

const InvalidFeedback = props => (
  <Text
    color="danger"
    mt={10}
    variant="helper"
    fontWeight="medium"
    {...props}
  />
);

export default InvalidFeedback;
