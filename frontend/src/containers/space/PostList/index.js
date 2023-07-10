import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Text } from 'rebass';
import { LoadingContainer } from 'components/common';
import SpaceActions, { SpaceSelectors } from 'redux/SpaceRedux';
import isMobile from 'utils/mobile';
import history, { silentPushState } from 'utils/history';
import Upload from '../Upload';
import PostItem from './PostItem';

function PostList({ space, loadPosts, posts, postsLoading, setCurrentPost }) {
  const handleViewPost = post => {
    if (isMobile()) {
      history.push(`/spaces/${space.slug}/posts/${post._id}`);
    } else {
      setCurrentPost(post);
      silentPushState(`/spaces/${space.slug}/posts/${post._id}`);
    }
  };

  useEffect(() => {
    loadPosts(space._id);
  }, []);

  return (
    <LoadingContainer loading={postsLoading}>
      <Flex flexWrap="wrap" alignItems="center" mx={[-10, -20]}>
        {!posts.length && (
          <Text>
            <Upload spaceId={space._id}>
              {widgetApi => (
                <Text
                  onClick={() => widgetApi.current.openDialog()}
                  variant="link"
                  as="span"
                  mr={5}
                >
                  Upload
                </Text>
              )}
            </Upload>
            the first photo or video.
          </Text>
        )}
        {posts.map(post => (
          <PostItem
            key={post._id}
            post={post}
            px={[5, 10]}
            py={[5, 10]}
            onClick={() => handleViewPost(post)}
          />
        ))}
      </Flex>
    </LoadingContainer>
  );
}

PostList.propTypes = {
  loadPosts: PropTypes.func.isRequired,
  setCurrentPost: PropTypes.func.isRequired,
  space: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  postsLoading: PropTypes.bool.isRequired
};

const mapStatesToProps = state => ({
  space: SpaceSelectors.selectCurrentSpace(state),
  posts: SpaceSelectors.selectPosts(state),
  postsLoading: SpaceSelectors.selectPostsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  loadPosts: spaceId => dispatch(SpaceActions.loadPosts(spaceId)),
  setCurrentPost: post => dispatch(SpaceActions.setCurrentPost(post))
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(PostList);
