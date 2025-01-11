import React, { useState, useContext } from 'react';
import { Container, Separator } from '@radix-ui/themes';
import { Menu } from '../components/Menu';
import { Flex, Box, Text, Button } from '@radix-ui/themes';
import { CustomPlayer } from '../components/CustomPlayer';
import { Headlines } from '../components/Headlines';
import { ComingSchedule } from '../components/ComingSchedule';
import { useMediaQuery } from 'react-responsive';
import { FilterBy } from '../components/FilterBy';
// import DataService from '@/services/DataService';
import { ContentContext } from '../context/ContentContextProvider';
import { AvatarBadge } from '../components/AvatarBadge';

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

  // const [scheduleData, setScheduleData] = useState<never[]>([]);
  const { searchBy } = useContext(ContentContext);

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
  // console.log('searchBy', searchBy, scheduleData);
  // const getSeasonSchedule = (year) => {
  //   DataService.getSeasonSchedule(year)
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     .then((response: any) => {
  //       setScheduleData(response.data);
  //     })
  //     .catch((err: Error) => {
  //       console.error('Error response:', err);
  //     });
  // };

  // useEffect(() => {
  //   getSeasonSchedule('2024');
  // }, []);
  console.count();

  return (
    <Box>
      <Container className="m-5">
        <Menu />
      </Container>
      <Container className="border-y"></Container>
      <Separator />
      <Box className={` ${isMobile ? 'px-3' : 'px-32'} mx-9 justify-center`}>
        <Flex align="center" className="gap-4" wrap="wrap">
          {searchBy?.map(({ name, icon, playerIcon, abbreviation }) => (
            <AvatarBadge
              key={name}
              content={name}
              data={[
                { src: icon, fallback: abbreviation },
                ...(playerIcon ? [{ src: playerIcon, fallback: abbreviation }] : [])
              ]}
            />
          ))}
        </Flex>
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
