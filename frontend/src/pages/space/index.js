import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LoadingContainer } from 'components/common';
import get from 'lodash/get';
import request from 'api/request';
import SpaceActions from 'redux/SpaceRedux';
import withLoading from 'hocs/withLoading';

import SpacePostView from './view';
import SpaceHome from './home';
import SpaceInvite from './invite';

function SpaceRoutes({ match, history, setSpace, setOverlayLoading }) {
  const [loading, setLoading] = useState(true);
  const slug = get(match, 'params.slug', '');
  const { url: prefix } = match;

  useEffect(() => {
    async function loadSpace() {
      setOverlayLoading(true);
      setLoading(true);
      const resp = await request('space', 'get', [slug]);

      if (resp.ok) {
        setSpace(resp.data);
      } else {
        // TODO handle error
        history.push('/');
      }
      setLoading(false);
    }

    loadSpace();
  }, [slug]);

  return (
    <LoadingContainer loading={loading}>
      {() => (
        <Switch>
          <Route exact path={`${prefix}`} component={SpaceHome} />
          <Route
            exact
            path={`${prefix}/posts/:postId`}
            component={SpacePostView}
          />
          <Route exact path={`${prefix}/invite`} component={SpaceInvite} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      )}
    </LoadingContainer>
  );
}

SpaceRoutes.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  setOverlayLoading: PropTypes.func,
  setSpace: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setSpace: space => dispatch(SpaceActions.setSpace(space))
});

const enhance = compose(
  withRouter,
  withLoading,
  connect(
    null,
    mapDispatchToProps
  )
);

export default enhance(SpaceRoutes);
