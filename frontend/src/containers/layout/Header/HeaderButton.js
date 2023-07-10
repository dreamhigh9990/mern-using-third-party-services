import React from 'react';
import { Button } from 'rebass';

function HeaderButton({ ...rest }) {
  return (
    <Button
      variant="secondary"
      sx={{ borderRadius: ['default', 'button'] }}
      {...rest}
    />
  );
}

export default HeaderButton;
