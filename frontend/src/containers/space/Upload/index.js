import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Widget } from '@uploadcare/react-widget/en';
import request from 'api/request';
import { Button } from 'components/common';
import SpaceActions from 'redux/SpaceRedux';
import { MainSelectors } from 'redux/MainRedux';

function Upload({ user, spaceId, addPosts, children }) {
  const widgetApi = useRef();
  const [value, setValue] = useState(null);

  const handleUpload = async fileInfo => {
    // file info is FileGroupInfo here
    setValue(fileInfo);
    const resp = await request(
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
      { spaceId }
    );

    // reset upload modal
    if (resp.ok) {
      addPosts([
        {
          ...resp.data,
          user
        }
      ]);
      setValue(null);
    } else {
      // @TODO handle feedback
      widgetApi.current.openDialog();
    }
  };

  return (
    <>
      {children ? (
        children(widgetApi, value)
      ) : (
        <Button
          variant="primary"
          icon="fas fa-camera"
          loading={!!value}
          onClick={() => widgetApi.current.openDialog()}
        >
          Upload
        </Button>
      )}
      <Widget
        id="file"
        ref={widgetApi}
        publicKey={process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY}
        value={value}
        previewStep
        preloader=""
        clearable
        crop="1:1"
        imagesOnly
        cdnBase="https://cdn.rembrance.com"
        tabs="file camera url facebook gdrive gphotos dropbox instagram"
        inputAcceptTypes="image/*"
        preferredTypes="image/*"
        onChange={handleUpload}
      />
    </>
  );
}

Upload.propTypes = {
  children: PropTypes.func,
  user: PropTypes.object.isRequired,
  spaceId: PropTypes.string.isRequired,
  addPosts: PropTypes.func.isRequired
};

const mapStatesToProps = state => ({
  user: MainSelectors.selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  addPosts: posts => dispatch(SpaceActions.addPosts(posts))
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(Upload);
