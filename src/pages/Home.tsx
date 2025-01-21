import React, { useState, useContext, useEffect } from 'react';
import { Container, Separator } from '@radix-ui/themes';
import { Menu } from '../components/Menu';
import { Flex, Box, Text, Button } from '@radix-ui/themes';
import { Headlines } from '../components/Headlines';
import { ComingSchedule } from '../components/ComingSchedule';
import { useMediaQuery } from 'react-responsive';
import { FilterBy } from '../components/FilterBy';
import { ContentContext } from '../context/ContentContextProvider';
import { AvatarBadge } from '../components/AvatarBadge';
import DataService from '@/services/DataService';
import { HighlightClips } from '@/components/HighlightClips';
import { News } from '@/components/News';

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

type ISubscription = {
  teams: string[] | number[];
  players: string[] | number[];
};

export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [subscription, setSubscription] = useState<ISubscription>();
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

  const getSubscription = async () => {
    await DataService.getSubscription().then((response) => setSubscription(response?.data));
  };

  useEffect(() => {
    getSubscription();
  }, []);

  console.count();
  console.log('subscription', subscription);
  return (
    <Box>
      <Container className="m-5">
        <Menu subscriptions={subscription} />
      </Container>
      <Container className="border-y"></Container>
      <Separator />
      <Box className={` ${isMobile ? 'px-3' : 'px-32'} mx-9 justify-center`}>
        <Flex align="center" className="gap-4" wrap="wrap">
          {searchBy?.map(({ name, icon, playerIcon, abbreviation }) => (
            <AvatarBadge
              key={name}
              content={name}
              isClearable
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
        <HighlightClips />
        <Separator className="my-6" />
        <Flex className="pb-9" direction={isMobile ? 'column' : 'row'}>
          <Headlines />
          <Separator orientation="vertical" className="mx-9" />
          <ComingSchedule subscriptions={subscription?.teams} />
        </Flex>
        <News />
      </Box>
    </Box>
  );
};
