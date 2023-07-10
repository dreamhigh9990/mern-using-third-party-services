import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Image } from 'rebass';
import { Widget } from '@uploadcare/react-widget/en';

function Uploader({ value, onChange, crop }) {
  const widgetApi = useRef();

  const handleUpload = fileInfo => {
    onChange(fileInfo);
  };

  return (
    <Box>
      <Box
        width={300}
        height={300}
        variant="placeholder"
        onClick={() => widgetApi.current.openDialog()}
        sx={{
          cursor: 'pointer'
        }}
      >
        {value && <Image src={value} />}
        {!value && (
          <>
            <Text as="i" className="far fa-camera" fontSize={45} mb={10} />
            <Text variant="body4">Add Photo</Text>
          </>
        )}
      </Box>
      <Widget
        id="file"
        ref={widgetApi}
        cdnBase="https://cdn.rembrance.com"
        publicKey={process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY}
        previewStep
        tabs="file camera url facebook gdrive gphotos dropbox instagram"
        clearable
        crop={crop}
        imagesOnly
        inputAcceptTypes="image/*"
        preferredTypes="image/*"
        onChange={handleUpload}
      />
    </Box>
  );
}

Uploader.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  crop: PropTypes.string
};

Uploader.defaultProps = {
  crop: '1:1'
};

export default Uploader;
