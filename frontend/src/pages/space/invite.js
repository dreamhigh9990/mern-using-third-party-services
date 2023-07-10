import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MobileHeader, Button } from 'components/common';
import InvitationLink from 'containers/space/InvitationLink';
import TextLink from 'containers/space/TextLink';
import { SpaceSelectors } from 'redux/SpaceRedux';
import withLoading from 'hocs/withLoading';

function SpaceInvite({ space, setOverlayLoading }) {
  useEffect(() => {
    setOverlayLoading(false);
  }, []);

  return (
    <Box>
      <MobileHeader backLink={`/spaces/${space.slug}`}>
        Invite Members
      </MobileHeader>
      <Box px={50} py={40}>
        <InvitationLink slug={space.slug} />
        <TextLink space={space} />
        <Button
          variant="primarySquare"
          to={`/spaces/${space.slug}`}
          as={Link}
          mt={15}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
}

SpaceInvite.propTypes = {
  space: PropTypes.object.isRequired,
  setOverlayLoading: PropTypes.func
};

const mapStatesToProps = state => ({
  space: SpaceSelectors.selectCurrentSpace(state)
});

export default withLoading(connect(mapStatesToProps)(SpaceInvite));
