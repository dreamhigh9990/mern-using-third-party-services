import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Box } from 'rebass';

const dropdownItemActive = props =>
  props.active &&
  css`
    text-decoration: none;
    color: ${props.theme.colors.white};
    background-color: ${props.theme.colors.brand};

    &:hover {
      background-color: ${props.theme.colors.brand};
    }
  `;

const dropdownItemDisabled = props =>
  props.disabled &&
  css`
    color: ${props.theme.colors.gray};
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  `;

const DropdownItem = styled(Box)`
  clear: both;
  cursor: pointer;
  color: ${props => props.theme.colors.brand};
  text-align: inherit;
  white-space: nowrap;
  text-decoration: none !important;
  display: block;
  border: none;
  border-radius: ${p => p.theme.radii[1]};

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.brand};
    color: ${props => props.theme.colors.background};
  }
  ${props => dropdownItemActive(props)};
  ${props => dropdownItemDisabled(props)};
`;

DropdownItem.defaultProps = {
  px: 24,
  py: 8,
  fontWeight: 0,
  fontSize: 1,
  bg: 'none',
  className: 'm-dropdown-item'
};

export default DropdownItem;
