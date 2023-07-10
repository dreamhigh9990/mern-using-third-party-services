import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex, Text } from 'rebass';
import { SpaceSelectors } from 'redux/SpaceRedux';
import { UserMention, Divider } from 'components/common';
import CommentList from 'containers/comment/CommentList';
import CommentForm from 'containers/comment/CommentForm';
import { getHumanizedDate } from 'helpers/datetime';

function PostView({ space, post, onBack }) {
  return (
    <Flex flexDirection={['column', 'row']}>
      <Flex
        alignItems="center"
        justifyContent="center"
        width={[1, 600]}
        height={['initial', 600]}
        pt={['100%', 0]}
        bg="background2"
        sx={{
          backgroundImage: `url(${post.fileUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }}
      />
      <Flex
        width={[1, 300]}
        height={['initial', 600]}
        flexDirection="column"
        sx={{
          borderColor: 'divider',
          borderStyle: 'solid',
          borderWidth: [0, 1]
        }}
      >
        <Box px={20} py={10}>
          <Text variant="caption" lineHeight="14px" mb={5}>
            <UserMention variant="caption" fontWeight="bold" user={post.user} />{' '}
            added a photo to{' '}
            <Text
              variant="caption"
              as="span"
              fontWeight="bold"
              sx={{ cursor: 'pointer' }}
              onClick={onBack}
            >
              {space.name}
            </Text>{' '}
            memorial.
          </Text>
          <Text variant="subtitle" color="text3">
            {getHumanizedDate(post.createdAt)}
          </Text>
        </Box>
        <Divider />
        <CommentList space={space} post={post} flex={1} />
        <Divider display={['none', 'block']} />
        <CommentForm space={space} post={post} />
      </Flex>
    </Flex>
  );
}

PostView.propTypes = {
  space: PropTypes.object,
  post: PropTypes.object,
  onBack: PropTypes.func
};

const mapStatesToProps = state => ({
  space: SpaceSelectors.selectCurrentSpace(state)
});

export default connect(mapStatesToProps)(PostView);
