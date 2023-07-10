import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Box } from 'rebass';

import Spaces from './spaces';

function AccountRoutes({ match }) {
  const { url: prefix } = match;

  return (
    <Box bg="background2">
      <Switch>
        <Route exact path={`${prefix}/spaces`} component={Spaces} />
        <Route render={() => <Redirect to="/account/spaces" />} />
      </Switch>
    </Box>
  );
}

AccountRoutes.propTypes = {
  match: PropTypes.object
};

export default withRouter(AccountRoutes);
