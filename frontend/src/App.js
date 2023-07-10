import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import MainActions, { MainSelectors } from 'redux/MainRedux';
import { MainLayout, Footer, Header, LoadingOverlay } from 'containers/layout';
import { LoadingContainer } from 'components/common';

import Home from 'pages/home';
import SpaceCreate from 'pages/home/space-create';
import AuthRoutes from 'pages/auth';
import SpaceRoutes from 'pages/space';
import Invite from 'pages/invite';
import AccountSpaces from 'pages/account/spaces';
import AdminRoutes from 'pages/admin';
import heapInstall from 'utils/heap';
import hotjarInstall from 'utils/hotjar';

// @TODO manage loading state of API with linear progress
class App extends Component {
  componentDidMount() {
    this.startup();
    heapInstall();
    hotjarInstall();
  }

  startup = async () => {
    const { setLoaded, refreshProfile } = this.props;
    const token = Cookies.get('memorial-token');

    if (token) {
      await refreshProfile();
    }
    setLoaded(true);
  };

  renderGuestRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={AuthRoutes} />
        <Route path="/space-create" component={SpaceCreate} />
        <Route exact path="/invite/:slug" component={Invite} />
        <Route render={() => <Redirect to="/auth/login" />} />
      </Switch>
    );
  }

  renderUserRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={AccountSpaces} />
        <Route path="/auth" component={AuthRoutes} />
        <Route path="/space-create" component={SpaceCreate} />
        <Route path="/spaces/:slug" component={SpaceRoutes} />
        <Route path="/admin" component={AdminRoutes} />
        <Route exact path="/invite/:slug" component={Invite} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  renderContent = () => {
    const { isLoggedin } = this.props;

    if (isLoggedin) {
      return this.renderUserRoutes();
    }

    return this.renderGuestRoutes();
  };

  render() {
    const { loaded, loading } = this.props;

    return (
      <MainLayout>
        <LoadingOverlay loading={loading} />
        <LoadingContainer loading={!loaded}>
          {() => (
            <>
              <Header />
              {this.renderContent()}
              <Footer />
            </>
          )}
        </LoadingContainer>
      </MainLayout>
    );
  }
}

App.propTypes = {
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  isLoggedin: PropTypes.bool,
  setLoaded: PropTypes.func,
  refreshProfile: PropTypes.func
};

const mapStatesToProps = state => ({
  loading: MainSelectors.selectLoading(state),
  loaded: MainSelectors.selectLoaded(state),
  isLoggedin: MainSelectors.selectLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  setLoaded: loaded => dispatch(MainActions.setLoaded(loaded)),
  refreshProfile: () => dispatch(MainActions.refreshProfile())
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(App);
