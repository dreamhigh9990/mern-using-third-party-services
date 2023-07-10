import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Spaces from './spaces';

function AdminRoutes({ match }) {
  const { url: prefix } = match;

  return (
    <Switch>
      <Route exact path={`${prefix}/spaces`} component={Spaces} />
      <Route render={() => <Redirect to="/admin/spaces" />} />
    </Switch>
  );
}

AdminRoutes.propTypes = {
  match: PropTypes.object
};

export default withRouter(AdminRoutes);
