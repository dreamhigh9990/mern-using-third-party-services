import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Text, Button } from 'rebass';
import { FluidContainer } from 'components/common';
import { Content } from 'containers/layout';

function Home() {
  return (
    <Content py={0} maxWidth="100%" px={0}>
      <FluidContainer alignItems="center" display="flex" pt={[56, 112]}>
        <Text as="h1" variant="h1" mb={40}>
          Beautiful, online memorials
        </Text>
        <Text
          maxWidth={900}
          variant="body3"
          color="text3"
          mb={40}
          textAlign={['left', 'center']}
        >
          Celebrate a life through a private, online memorial — for free. Add
          photos, videos, and comments to commemorate with friends and family.
        </Text>
        <Button
          as={Link}
          to="/space-create"
          variant="home"
          width={[1, 400]}
          mb={60}
        >
          Create Memorial
        </Button>
        <Image
          variant="imagecard"
          width={1}
          src="/Rembrance.png"
          sx={{ boxShadow: 'homeimg', zIndex: -1 }}
        />
      </FluidContainer>
    </Content>
  );
}

export default Home;
