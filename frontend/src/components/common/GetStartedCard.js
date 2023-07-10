import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text, Box } from 'rebass';

function GetStartedCard({ title, icon, children, index }) {
  return (
    <Flex
      variant="card"
      width={[1, 'calc(25% - 30px)']}
      textAlign="center"
      flexDirection="column"
      alignItems="center"
      pt={50}
      px={20}
      pb={[50, 0]}
      my={[20, 0]}
      height={['initial', 300]}
    >
      <Box variant="circle">
        <Text variant="title">{index}</Text>
      </Box>
      <Text as="i" fontSize={40} className={`far fa-${icon}`} mb={25} />
      <Text variant="h4" mb={15}>
        {title}
      </Text>
      <Text variant="body3" color="text3">
        {children}
      </Text>
    </Flex>
  );
}

GetStartedCard.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.string,
  icon: PropTypes.string
};

export default GetStartedCard;
