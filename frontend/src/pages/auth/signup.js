import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import { Text } from 'rebass';
import SignupForm from 'containers/auth/SignupForm';
import { AuthLayout } from 'containers/layout';
import request from 'api/request';
import { getQueryParam } from 'utils/history';
import MainActions from 'redux/MainRedux';

function Signup({ history, refreshProfile, setLogin }) {
  const redirectUri = getQueryParam('redirect_uri') || '';
  const handleSubmit = async (token, user) => {
    setLogin(token, user);
    await refreshProfile();

    history.push(redirectUri || '/');
  };

  const handleSignup = async values => {
    const resp = await request('auth', 'signup', [values]);

    if (!resp.ok) {
      throw new Error(resp.data.message);
    }

    await handleSubmit(resp.data.token);
  };

  return (
    <AuthLayout>
      <Text variant="pagetitle" mb={35}>
        Sign Up
      </Text>
      <SignupForm onSubmit={handleSignup} />
      <Text mt={20} textAlign="center" variant="helper">
        Already have a Rembrance account?&nbsp;
        <Text
          as={Link}
          variant="boldlink"
          to={`/auth/login?redirect_uri=${redirectUri}`}
        >
          Log In
        </Text>
      </Text>

      <Text textAlign="center" variant="helper">
        By creating an account, you agree to the&nbsp;
        <Text
          as="a"
          variant="boldlink"
          target="_blank"
          rel="noopener noreferrer"
          href="https://help.rembrance.com/hc/en-us/articles/360034370131-Terms-of-Service"
        >
          Terms of Service
        </Text>
        &nbsp;and&nbsp;
        <Text
          as="a"
          variant="boldlink"
          target="_blank"
          rel="noopener noreferrer"
          href="https://help.rembrance.com/hc/en-us/articles/360034370231-Privacy-Policy"
        >
          Privacy Policy
        </Text>
        .
      </Text>
    </AuthLayout>
  );
}

Signup.propTypes = {
  history: PropTypes.object,
  setLogin: PropTypes.func,
  refreshProfile: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setLogin: (token, user) => dispatch(MainActions.setLogin(token, user)),
  refreshProfile: () => dispatch(MainActions.refreshProfile())
});

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(Signup);
