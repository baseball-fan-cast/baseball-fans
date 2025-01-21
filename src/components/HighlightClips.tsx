import React, { useEffect } from 'react';
import { Flex } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import { CustomPlayer } from './CustomPlayer';
import DataService from '@/services/DataService';

export const HighlightClips = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed

  const getHighlightClips = () => {
    DataService.getMedia()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        console.log('getHighlightClips response', response?.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    getHighlightClips();
  }, []);

  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justify="between"
      className="w-full gap-5 w-10/12"
    >
      <CustomPlayer
        url="https://www.youtube.com/shorts/f6_ThAKOtfU?feature=share"
        avatarData={{ src: '', fallback: 'A', title: 'Atlanta Braves' }}
      />
      <CustomPlayer
        url="https://youtu.be/_GT3pzzWRH4"
        avatarData={{
          src: 'src/assets/chicagoCubs.svg',
          fallback: 'CN',
          title: 'Chicago Cubs'
        }}
      />
      <CustomPlayer
        url="https://www.youtube.com/shorts/f6_ThAKOtfU?feature=share"
        avatarData={{
          src: 'src/assets/images/Player1.png',
          fallback: 'CN',
          title: 'Matthew Boyd'
        }}
      />
    </Flex>
  );
};
