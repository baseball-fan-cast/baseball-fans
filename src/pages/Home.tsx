import React from 'react';
import { Container, Separator } from '@radix-ui/themes';
import { Menu } from '../components/Menu';
import { Flex, Box, Text } from '@radix-ui/themes';
import { CustomPlayer } from '../components/CustomPlayer';
import { Headlines } from '../components/Headlines';
import { ComingSchedule } from '../components/ComingSchedule';
import { useMediaQuery } from 'react-responsive';

export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed

  return (
    <Box>
      <Container className="m-5">
        <Menu />
      </Container>
      <Container className="border-y"></Container>
      <Separator />
      <Box className="px-9 {mx-9} justify-center">
        <Text as="div" className="font-bold my-5 text-2xl">
          Highlight Clips and Replays
        </Text>
        <Flex
          direction={isMobile ? 'column' : 'row'}
          justify="between"
          className="w-full gap-x-2 w-10/12"
        >
          <CustomPlayer url="https://www.youtube.com/shorts/f6_ThAKOtfU?feature=share" />
          <CustomPlayer url="https://youtu.be/_GT3pzzWRH4" />
          <CustomPlayer url="https://www.youtube.com/shorts/f6_ThAKOtfU?feature=share" />
        </Flex>
        <Separator className="my-6" />
        <Flex className="pb-9" direction={isMobile ? 'column' : 'row'}>
          <Headlines />
          <Separator orientation="vertical" className="mx-9" />
          <ComingSchedule />
        </Flex>
      </Box>
    </Box>
  );
};
