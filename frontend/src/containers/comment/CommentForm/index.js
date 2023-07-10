import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Button } from 'rebass';
import { Input } from '@rebass/forms';
import CommentActions, { CommentSelectors } from 'redux/CommentRedux';
import { MainSelectors } from 'redux/MainRedux';
import request from 'api/request';

function CommentForm({
  addComment,
  currentComment,
  changeComment,
  setCurrentComment,
  space,
  post,
  user,
  ...props
}) {
  const inputRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const handleChange = evt => {
    changeComment(evt.target.value);
  };

  const submitComment = async () => {
    // @TODO edit comment
    // @TODO handle error
    setSaving(true);
    const resp = await request(
      'comment',
      'create',
      [
        {
          ...currentComment,
          post: post._id
        }
      ],
      { spaceId: space._id }
    );

    if (resp.ok) {
      addComment({
        ...resp.data,
        user
      });
      setCurrentComment({});
    }

    setSaving(false);
    inputRef.current.focus();
  };

  const handleKeyDown = evt => {
    if (evt.keyCode === 13) {
      submitComment();
    }
  };

  return (
    <Box
      sx={{
        position: ['fixed', 'relative'],
        bottom: [0, 'initial'],
        left: [0, 'initial'],
        right: [0, 'initial'],
        bg: ['background2', 'background'],
        py: [15, 0],
        px: [25, 0],
        borderTopWidth: [1, 0],
        borderTopStyle: 'solid',
        borderTopColor: 'divider'
      }}
      {...props}
    >
      <Input
        ref={inputRef}
        disabled={saving}
        value={currentComment.content || ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a comment"
        variant="naked"
        pr={50}
        autoFocus
      />
      <Button
        variant="inputxs"
        disabled={!currentComment.content}
        onClick={submitComment}
        sx={{
          position: 'absolute',
          top: [20, 11],
          right: [40, 10],
          width: 'initial'
        }}
      >
        Post
      </Button>
    </Box>
  );
}

CommentForm.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  space: PropTypes.object.isRequired,
  changeComment: PropTypes.func.isRequired,
  setCurrentComment: PropTypes.func.isRequired,
  currentComment: PropTypes.object,
  addComment: PropTypes.func
};

const mapStatesToProps = state => ({
  user: MainSelectors.selectUser(state),
  currentComment: CommentSelectors.selectCurrentComment(state)
});

const mapDispatchToProps = dispatch => ({
  addComment: comment => dispatch(CommentActions.addComment(comment)),
  changeComment: content => dispatch(CommentActions.changeComment(content)),
  setCurrentComment: comment =>
    dispatch(CommentActions.setCurrentComment(comment))
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(CommentForm);
