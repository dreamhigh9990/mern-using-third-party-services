import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'rebass';
import { UserMention } from 'components/common';
import { getAgo } from 'helpers/datetime';

function CommentItem({ comment, ...props }) {
  return (
    <Box {...props}>
      <Box>
        <UserMention user={comment.user} />
        <Text as="span" mx={5} fontSize="10px" color="text3">
          •
        </Text>
        <Text variant="comment" as="span" color="text3">
          {getAgo(comment.createdAt)}
        </Text>
      </Box>
      <Text variant="comment">{comment.content}</Text>
    </Box>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object
};

export default CommentItem;
