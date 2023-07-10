import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { Text, Box, Button } from 'rebass';
import get from 'lodash/get';
import { LoadingContainer } from 'components/common';
import { AuthLayout } from 'containers/layout';
import MainActions, { MainSelectors } from 'redux/MainRedux';
import { buildUrl, goToPage } from 'utils/history';
import request from 'api/request';

function InviteHome({
  isLoggedIn,
  email,
  permissions,
  location,
  match,
  setLogout,
  refreshProfile
}) {
  const [space, setSpace] = useState(null);
  const slug = get(match, 'params.slug', '');

  const loadSpace = async () => {
    const hasAccess = permissions.find(p => p.space.slug === slug);

    if (hasAccess) {
      goToPage(`/spaces/${slug}`);
      return;
    }

    const resp = await request('space', 'light', [slug]);
    if (resp.ok) {
      setSpace(resp.data);
    } else {
      goToPage('/');
    }
  };

  const joinSpace = async () => {
    const resp = await request('space', 'join', [slug]);

    if (resp.ok) {
      await refreshProfile();
      goToPage(`/spaces/${slug}`);
    }

    // TODO handle failure
  };

  useEffect(() => {
    loadSpace();
  }, []);

  if (!space) {
    return (
      <AuthLayout>
        <LoadingContainer loading />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout maxWidth={530} pt={50} pb={100} px={28}>
      <Text variant="pagetitle" mb={20}>
        Welcome
      </Text>
      <Text variant="h4" mb={20}>
        You're about to join a memorial for {space.name}
      </Text>
      {isLoggedIn ? (
        <Box>
          <Text mb={10}>
            You will be joining with the account associated with&nbsp;
            <Text fontWeight="bold" as="b">
              {email}
            </Text>
            .
          </Text>
          <Text mb={10}>Is this the correct email address?</Text>

          <Button
            variant="primarySquare"
            width={[1, 1]}
            mb={30}
            onClick={joinSpace}
          >
            Yes, that's the right address.
          </Button>
          <Text mb={10}>
            If that's not right, we can help you to switch to a different email
            address by logging you out so you can sign up or log in to the right
            account.
          </Text>
          <Button variant="secondarySquare" width={[1, 1]} onClick={setLogout}>
            Switch to a different address.
          </Button>
        </Box>
      ) : (
        <Box>
          <Text mb={10}>
            To access the memorial, you must first create a Rembrance account.
          </Text>

          <Button
            variant="primarySquare"
            width={[1, 1]}
            mb={30}
            as={Link}
            to={buildUrl('/auth/signup', { redirect_uri: location.pathname })}
          >
            Sign Up
          </Button>
          <Text mb={10}>Already have a Rembrance account?</Text>
          <Button
            variant="secondarySquare"
            width={[1, 1]}
            as={Link}
            to={buildUrl('/auth/login', { redirect_uri: location.pathname })}
          >
            Log In
          </Button>
        </Box>
      )}
    </AuthLayout>
  );
}

InviteHome.propTypes = {
  location: PropTypes.object,
  email: PropTypes.string,
  permissions: PropTypes.array,
  match: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  setLogout: PropTypes.func,
  refreshProfile: PropTypes.func
};

const mapStatesToProps = state => ({
  isLoggedIn: MainSelectors.selectLoggedIn(state),
  email: MainSelectors.selectEmail(state),
  permissions: MainSelectors.selectPermissions(state)
});

const mapDispatchToProps = dispatch => ({
  setLogout: () => dispatch(MainActions.setLogout()),
  refreshProfile: () => dispatch(MainActions.refreshProfile())
});

const enhance = compose(
  withRouter,
  connect(
    mapStatesToProps,
    mapDispatchToProps
  )
);
export default enhance(InviteHome);
