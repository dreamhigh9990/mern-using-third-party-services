import styled from '@emotion/styled';
import { Box } from 'rebass';

const DropdownMenu = styled(Box)`
  user-select: none;
  margin-top: 10px;
  position: absolute;
  top: 100%;
  z-index: 1000;
  display: ${props => (props.show ? 'block' : 'none')};
  ${props => (props.alignRight ? 'right' : 'left')}: 0;
`;

DropdownMenu.defaultProps = {
  px: 8,
  py: 12,
  variant: 'dropdownmenu'
};

export default DropdownMenu;
