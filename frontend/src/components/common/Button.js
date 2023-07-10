import React from 'react';
import PropTypes from 'prop-types';
import { Button as RebassButton, Text } from 'rebass';

function Button({ loading, disabled, icon, children, ...rest }) {
  return (
    <RebassButton disabled={loading || disabled} {...rest}>
      {loading && <Text mr={5} className="far fa-circle-notch fa-spin" />}
      {icon && <Text mr={5} className={icon} />}
      {children}
    </RebassButton>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  children: PropTypes.node
};

export default Button;
