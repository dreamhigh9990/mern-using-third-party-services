import React from 'react';
import { Text } from 'rebass';

const DropdownTrigger = ({ label, ...props }, ref) => {
  return (
    <Text ref={ref} {...props}>
      {label}
      <Text as="i" className="fas fa-caret-down" ml={5} />
    </Text>
  );
};

export default React.forwardRef(DropdownTrigger);
