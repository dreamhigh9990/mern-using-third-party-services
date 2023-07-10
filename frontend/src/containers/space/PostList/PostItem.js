import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from 'rebass';
import uc from 'utils/uploadcare';

function PostItem({ post, ...props }) {
  return (
    <Box variant="postthumb" {...props}>
      <Image
        src={uc.thumb(post.fileUrl)}
        display="block"
        variant="postthumbimg"
      />
    </Box>
  );
}

PostItem.propTypes = {
  post: PropTypes.object
};

export default PostItem;
