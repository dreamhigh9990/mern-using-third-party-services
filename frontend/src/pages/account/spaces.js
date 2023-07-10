import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Text } from 'rebass';
import { MainSelectors } from 'redux/MainRedux';
import { Content } from 'containers/layout';
import { SpaceSummaryCard } from 'components/space';

function Spaces({ spaces }) {
  return (
    <Content py={[0, 50]}>
      <Text variant="title" mb={-40} display={['none', 'block']}>
        My Memorials
      </Text>
      {!spaces.length && (
        <Text variant="body4" py={100}>
          No memorials yet.
          <Text variant="link" as={Link} to="/space-create" ml={5}>
            Add a memorial
          </Text>
          .
        </Text>
      )}
      {spaces.map(p => (
        <SpaceSummaryCard key={p._id} space={p} py={[50, 100]}>
          <Button variant="primary" as={Link} to={`/spaces/${p.slug}`}>
            Visit Memorial
          </Button>
        </SpaceSummaryCard>
      ))}
    </Content>
  );
}

Spaces.propTypes = {
  spaces: PropTypes.array
};

const mapStatesToProps = state => ({
  spaces: MainSelectors.selectSpaces(state)
});

export default connect(mapStatesToProps)(Spaces);
