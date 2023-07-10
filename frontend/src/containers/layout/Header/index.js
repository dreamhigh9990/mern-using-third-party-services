import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Image, Box, Flex, Text } from 'rebass';
import MainActions, { MainSelectors } from 'redux/MainRedux';
import {
  FluidContainer,
  DropdownItem,
  DropdownButton,
  MagicLink
} from 'components/common';
import HeaderNav from './HeaderNav';
import HeaderNavItem from './HeaderNavItem';
import HeaderButton from './HeaderButton';

const NO_HEADER_LINKS = ['/space-create'];

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nav: false
    };
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      this.setState({ nav: false }); // eslint-disable-line
    }
  }

  onCloseNav = () => this.setState({ nav: false });

  onLogout = () => {
    const { setLogout } = this.props;
    this.onCloseNav();
    setLogout();
  };

  renderAccountMenu() {
    const { user } = this.props;
    return (
      <DropdownButton
        variant="headerlink"
        mr={33}
        label="Account"
        display={['none', 'block']}
        closeOnInsideClick
      >
        <DropdownItem as={Link} to="/">
          My Memorials
        </DropdownItem>
        {user.role === 'ADMIN' && (
          <DropdownItem as={Link} to="/admin/spaces">
            Admin
          </DropdownItem>
        )}
        <DropdownItem onClick={this.onLogout}>Log Out</DropdownItem>
      </DropdownButton>
    );
  }

  renderItems() {
    const { isLoggedIn } = this.props;
    const { nav } = this.state;

    return (
      <HeaderNav
        mobileVisible={nav}
        onClose={() => this.setState({ nav: false })}
      >
        {/* <HeaderNavItem
          as={MagicLink}
          href="https://help.rembrance.com/hc/en-us/articles/360034369051-What-is-Rembrance-"
        >
          About
        </HeaderNavItem>
        <HeaderNavItem
          as={MagicLink}
          href="https://help.rembrance.com/hc/en-us/articles/360034403771-What-are-the-pricing-plans-and-features-for-Rembrance-"
        >
          Pricing
        </HeaderNavItem> */}
        <HeaderNavItem
          as={MagicLink}
          href="https://help.rembrance.com/hc/en-us"
        >
          Help
        </HeaderNavItem>
        {!isLoggedIn && (
          <HeaderNavItem as={Link} to="/auth/login" display={['none', 'block']}>
            Log In
          </HeaderNavItem>
        )}
        {isLoggedIn && this.renderAccountMenu()}
        <Box flex={1} />
        {!isLoggedIn && (
          <HeaderButton
            as={Link}
            display={['block', 'none']}
            to="/auth/login"
            mb={10}
          >
            Log In
          </HeaderButton>
        )}
        {isLoggedIn && (
          <HeaderButton
            onClick={this.onLogout}
            display={['block', 'none']}
            mb={10}
          >
            Log Out
          </HeaderButton>
        )}
        <HeaderButton
          as={Link}
          to="/space-create"
          variant="secondary"
          display={['none', 'block']}
        >
          Create Memorial
        </HeaderButton>
        <HeaderButton
          as={Link}
          to="/space-create"
          variant="primary"
          display={['block', 'none']}
        >
          Create Memorial
        </HeaderButton>
      </HeaderNav>
    );
  }

  render() {
    const { nav } = this.state;
    const { location } = this.props;

    if (NO_HEADER_LINKS.includes(location.pathname)) {
      return null;
    }

    return (
      <Box
        bg="background"
        sx={{
          borderBottomWidth: location.pathname === '/' ? 0 : 1,
          borderBottomStyle: 'solid',
          borderBottomColor: 'divider',
          visibility: [
            location.pathname.startsWith('/spaces') ? 'hidden' : 'visible',
            'visible'
          ]
        }}
      >
        <FluidContainer
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          height={70}
          width={1}
          bg="background"
          sx={{
            position: [nav ? 'fixed' : 'relative', 'static'],
            zIndex: 10,
            top: 0
          }}
        >
          <Box as={Link} to="/">
            <Image
              display={['none', 'block']}
              src="/logo-full.svg"
              height={18}
              alt="logo"
            />
            <Image
              display={['block', 'none']}
              src="/logo.svg"
              height={18}
              alt="logo"
            />
          </Box>
          <Flex sx={{ display: ['flex', 'none'] }}>
            <Text
              variant="headerlink"
              fontSize="24px"
              color="brand"
              onClick={() => this.setState({ nav: !nav })}
            >
              <i className={nav ? 'far fa-times' : 'far fa-bars'} />
            </Text>
          </Flex>
          {this.renderItems()}
        </FluidContainer>
      </Box>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  location: PropTypes.object,
  user: PropTypes.object,
  setLogout: PropTypes.func
};

const mapStatesToProps = state => ({
  isLoggedIn: MainSelectors.selectLoggedIn(state),
  user: MainSelectors.selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  setLogout: () => dispatch(MainActions.setLogout())
});

const enhance = compose(
  withRouter,
  connect(
    mapStatesToProps,
    mapDispatchToProps
  )
);

export default enhance(Header);
