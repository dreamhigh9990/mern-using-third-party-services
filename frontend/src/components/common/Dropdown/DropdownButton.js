import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import listenClick from 'helpers/listenClick';
import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';
import DropdownTrigger from './DropdownTrigger';

const DropdownButton = ({
  children,
  label,
  alignRight,
  closeOnInsideClick,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClick = e => {
      if (closeOnInsideClick) {
        listenClick(e, buttonRef.current, () => setShow(false));
      } else {
        listenClick(e, ref.current, () => setShow(false));
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  const handleTrigger = evt => {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    setShow(!show);
  };

  return (
    <Dropdown ref={ref} className="m-dropdown">
      <DropdownTrigger
        ref={buttonRef}
        onClick={handleTrigger}
        label={label}
        {...props}
      />
      <DropdownMenu
        show={show}
        alignRight={alignRight}
        className="m-dropdown-menu"
      >
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

DropdownButton.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  closeOnInsideClick: PropTypes.bool,
  alignRight: PropTypes.bool
};

export default DropdownButton;
