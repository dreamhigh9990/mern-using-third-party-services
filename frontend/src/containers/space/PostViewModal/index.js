import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SpaceActions, { SpaceSelectors } from 'redux/SpaceRedux';
import { Modal, ModalHeader } from 'components/common';
import PostView from 'containers/space/PostView';
import { silentPushState } from 'utils/history';

function PostViewModal({ space, post, onClose }) {
  if (!post) {
    return null;
  }

  const handleClose = () => {
    onClose();
    silentPushState(`/spaces/${space.slug}`);
  };

  return (
    <Modal isOpen onRequestClose={handleClose}>
      <ModalHeader onClose={handleClose} display={['block', 'none']}>
        Photo
      </ModalHeader>
      <PostView post={post} onBack={handleClose} />
    </Modal>
  );
}

PostViewModal.propTypes = {
  space: PropTypes.object,
  post: PropTypes.object,
  onClose: PropTypes.func
};

const mapStatesToProps = state => ({
  space: SpaceSelectors.selectCurrentSpace(state),
  post: SpaceSelectors.selectCurrentPost(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(SpaceActions.setCurrentPost(null))
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(PostViewModal);
