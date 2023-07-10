import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Text, Box, Button } from 'rebass';
import { Link } from 'react-router-dom';
import withAuth from 'hocs/withAuth';
import { AuthLayout } from 'containers/layout';
import SpaceForm from 'containers/auth/SpaceForm';
import request from 'api/request';
import InvitationLink from 'containers/space/InvitationLink';
import TextLink from 'containers/space/TextLink';
import MainActions from 'redux/MainRedux';

function SpaceCreate({ refreshProfile }) {
  const [space, setSpace] = useState(null);
  const handleSubmit = async (values, fileInfo) => {
    const resp = await request('space', 'create', [
      {
        description: values.description,
        name: values.name,
        image: values.image
      }
    ]);

    if (resp.ok) {
      await refreshProfile();
      setSpace(resp.data);

      // silently upload first photo
      await request(
        'post',
        'create',
        [
          {
            filename: fileInfo.name,
            mimeType: fileInfo.mimeType,
            uploadcareId: fileInfo.uuid,
            fileUrl: fileInfo.cdnUrl
          }
        ],
        { spaceId: resp.data._id }
      );
    } else {
      throw new Error(resp.data.message);
    }
  };

  if (space) {
    return (
      <AuthLayout py={[50, 100]} px={28}>
        <Text variant="pagetitle" mb={56}>
          Invite Members
        </Text>
        <InvitationLink slug={space.slug} />
        <TextLink space={space} />
        <Box mt={20}>
          <Button
            as={Link}
            to={`/spaces/${space.slug}`}
            variant="primarySquare"
          >
            Done
          </Button>
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout py={[50, 100]} px={28}>
      <Text variant="pagetitle" mb={56}>
        Create Memorial
      </Text>
      <SpaceForm onSubmit={handleSubmit} buttonText="Create" />
    </AuthLayout>
  );
}

SpaceCreate.propTypes = {
  refreshProfile: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  refreshProfile: () => dispatch(MainActions.refreshProfile())
});

const enhance = compose(
  c =>
    withAuth(
      c,
      {
        redirect_uri: '/space-create'
      },
      '/auth/signup'
    ),
  connect(
    null,
    mapDispatchToProps
  )
);

export default enhance(SpaceCreate);
