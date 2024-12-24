import React, { useState, useEffect } from 'react';
import { Container, Separator } from '@radix-ui/themes';
import { Menu } from '../components/Menu';
import { Flex, Box, Text, Button } from '@radix-ui/themes';
import { CustomPlayer } from '../components/CustomPlayer';
import { Headlines } from '../components/Headlines';
import { ComingSchedule } from '../components/ComingSchedule';
import { useMediaQuery } from 'react-responsive';
import { FilterBy } from '../components/FilterBy';
import DataService from '@/services/DataService';

const filterByData = [
  {
    value: 'Highlight Clips',
    label: 'Highlight Clips'
  },
  {
    value: 'Headlines',
    label: 'Headlinest'
  },
  {
    value: 'Coming Schedule',
    label: 'Coming Schedule'
  }
];

export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchData, setSearchData] = useState<never[]>([]);
  const onRemove = (value: string) => {
    const filtered = selectedItems.filter((element) => element !== value);
    setSelectedItems(filtered);
  };
  const onSelect = (value: string) => {
    if (selectedItems.includes(value)) {
      onRemove(value);
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const getAllTeams = () => {
    DataService.getAllTeams()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setSearchData(response.data?.teams);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <Box>
      <Container className="m-5">
        <Menu searchData={searchData} />
      </Container>
      <Container className="border-y"></Container>
      <Separator />
      <Box className={` ${isMobile ? 'px-3' : 'px-32'} mx-9 justify-center`}>
        <Flex justify="between" align="baseline" className="py-9">
          <FilterBy
            filterData={filterByData}
            onSelect={onSelect}
            onRemove={onRemove}
            selectedItems={selectedItems}
          />
          <Button className="opacity-50" onClick={() => setSelectedItems([])}>
            Clear Filters
          </Button>
        </Flex>
        <Text as="div" className="font-bold mb-5 text-2xl">
          Highlight Clips and Replays
        </Text>
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
