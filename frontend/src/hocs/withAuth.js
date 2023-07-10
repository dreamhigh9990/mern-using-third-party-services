import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { MainSelectors } from 'redux/MainRedux';
import { goToPage } from 'utils/history';

const withAuth = (WrappedComponent, authParams, redirectUri) => {
  const AuthComponent = ({ isLoggedIn, user, ...props }) => {
    useEffect(() => {
      if (!isLoggedIn) {
        goToPage(redirectUri || '/auth/login', authParams);
      }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
      return null;
    }

    return <WrappedComponent currentUser={user} {...props} />;
  };

  const mapStatesToProps = state => ({
    isLoggedIn: MainSelectors.selectLoggedIn(state),
    user: MainSelectors.selectUser(state)
  });

  AuthComponent.propTypes = {
    isLoggedIn: PropTypes.bool,
    user: PropTypes.object
  };

  hoistNonReactStatics(AuthComponent, WrappedComponent);

  return connect(mapStatesToProps)(AuthComponent);
};

export default withAuth;
