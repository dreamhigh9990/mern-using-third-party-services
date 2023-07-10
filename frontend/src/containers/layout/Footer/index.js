import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MainSelectors } from 'redux/MainRedux';
// import HomeFooter from './HomeFooter';
import SimpleFooter from './SimpleFooter';

const NO_FOOTER_LINKS = ['/space-create'];

// @TODO home footer?
function Footer({ location, isLoggedIn }) {
  if (NO_FOOTER_LINKS.includes(location.pathname)) {
    return null;
  }

  if (isLoggedIn) {
    return null;
  }

  return <SimpleFooter />;
}

Footer.propTypes = {
  location: PropTypes.object,
  isLoggedIn: PropTypes.bool
};

const mapStatesToProps = state => ({
  isLoggedIn: MainSelectors.selectLoggedIn(state)
});

const enhance = compose(
  withRouter,
  connect(mapStatesToProps)
);

export default enhance(Footer);
