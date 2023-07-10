import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box } from 'rebass';
import get from 'lodash/get';
import { LoadingContainer, MobileHeader } from 'components/common';
import { SpaceSelectors } from 'redux/SpaceRedux';
import PostView from 'containers/space/PostView';
import request from 'api/request';
import history from 'utils/history';
import withLoading from 'hocs/withLoading';

function SpacePostView({ space, match, setOverlayLoading }) {
  const postId = get(match, 'params.postId', '');
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost(id) {
      setLoading(true);
      const resp = await request('post', 'get', [id], { spaceId: space._id });

      if (resp.ok) {
        setPost(resp.data);
      }

      // @TODO else redirect 404
      setLoading(false);
      setOverlayLoading(false);
    }

    loadPost(postId);
    document.body.className = 'gray-back';
    return () => {
      document.body.className = '';
    };
  }, [postId, space._id]);

  return (
    <Box bg="background2">
      <MobileHeader backLink={`/spaces/${space.slug}`}>Photo</MobileHeader>
      <LoadingContainer loading={loading}>
        {() => (
          <Box
            mx="auto"
            bg={['background']}
            display="table"
            width={[1, 'initial']}
            my={[0, 40]}
          >
            <PostView
              post={post}
              onBack={() => history.push(`/spaces/${space.slug}`)}
            />
          </Box>
        )}
      </LoadingContainer>
    </Box>
  );
}

SpacePostView.propTypes = {
  space: PropTypes.object.isRequired,
  setOverlayLoading: PropTypes.func,
  match: PropTypes.object
};

const mapStatesToProps = state => ({
  space: SpaceSelectors.selectCurrentSpace(state)
});

export default withLoading(connect(mapStatesToProps)(SpacePostView));
