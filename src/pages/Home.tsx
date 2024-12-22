import React from 'react';
import { Container, Separator } from '@radix-ui/themes';
import { Menu } from '../components/Menu';
import { Flex, Box, Text } from '@radix-ui/themes';
import { CustomPlayer } from '../components/CustomPlayer';

export const Home = () => {
  return (
    <Box>
      <Container className="m-5">
        <Menu />
      </Container>
      <Container className="border-y"></Container>
      <Separator />
      <Text as="div" className="font-bold my-2 px-9 text-2xl">
        Highlight Clips and Replays
      </Text>
      <Flex justify="between" className="w-full px-9 gap-x-2">
        <CustomPlayer url="https://www.youtube.com/shorts/f6_ThAKOtfU?feature=share" />
        <CustomPlayer url="https://youtu.be/_GT3pzzWRH4" />
        <CustomPlayer url="https://www.youtube.com/shorts/f6_ThAKOtfU?feature=share" />
      </Flex>
      <Separator />
    </Box>
  );
};
