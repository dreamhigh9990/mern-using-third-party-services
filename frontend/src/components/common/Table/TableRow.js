import React from 'react';
import { Box } from 'rebass';

const TableRow = props => (
  <Box
    as="tr"
    sx={{
      borderBottom: `1px solid #eee`,
      '&:hover': {
        bg: '#fbfbfb'
      }
    }}
    {...props}
  />
);

export default TableRow;
