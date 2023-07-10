import React from 'react';
import PropTypes from 'prop-types';
import { Image, Box, Text } from 'rebass';
import { FluidContainer } from 'components/common';

const HomeRow = ({
  reversed,
  src,
  title,
  children,
  description,
  titleVariant,
  ...props
}) => (
  <FluidContainer
    pt={[56, 112]}
    pb={[56, 112]}
    flexDirection={reversed ? ['column', 'row-reverse'] : ['column', 'row']}
    sx={{
      borderBottomColor: 'border3',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid'
    }}
    alignItems="center"
    {...props}
  >
    <Box flex={1}>
      <Text as={titleVariant} variant={titleVariant} mb={38}>
        {title}
      </Text>
      <Text color="text3" variant="body3" mb={47}>
        {description}
      </Text>
      {children}
    </Box>
    <Image
      variant="imagecard"
      width={['initial', 495]}
      maxHeight={440}
      ml={reversed ? 0 : [0, 140]}
      mr={reversed ? [0, 140] : 0}
      src={src}
    />
  </FluidContainer>
);

HomeRow.propTypes = {
  reversed: PropTypes.bool,
  titleVariant: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node
};

HomeRow.defaultProps = {
  titleVariant: 'h3'
};

export default HomeRow;
