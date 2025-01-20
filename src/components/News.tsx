/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Flex } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import DataService from '@/services/DataService';

export const News = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed

  const getNews = () => {
    DataService.getNews()
      .then((response: any) => {
        console.log('getNews response', response?.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justify="between"
      className="w-full gap-5 w-10/12"
    >
      News
    </Flex>
  );
};
