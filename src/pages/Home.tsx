import React, { useState, useContext, useEffect } from 'react';
import { Container, Separator, Text } from '@radix-ui/themes';
import { Menu } from '../components/Menu';
import { Flex, Box, Button } from '@radix-ui/themes';
import { Headlines } from '../components/Headlines';
import { ComingSchedule } from '../components/ComingSchedule';
import { useMediaQuery } from 'react-responsive';
import { FilterBy } from '../components/FilterBy';
import { ContentContext } from '../context/ContentContextProvider';
import { AvatarBadge } from '../components/AvatarBadge';
import DataService from '@/services/DataService';
import { HighlightClips } from '@/components/HighlightClips';
import { News } from '@/components/News';
import { useTranslation } from 'react-i18next';
import { ISubscriptionResponse } from '@/types';
import { Digest } from '@/components/Digest';

export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { t } = useTranslation();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // const [subscription, setSubscription] = useState<ISubscriptionData>();
  const [subscriptionTeams, setSubscriptionTeams] = useState();
  const [subscriptionPlayers, setSubscriptionPlayers] = useState();

  const { searchBy } = useContext(ContentContext);

  const filterByData = [
    {
      label: <Text>{t('highlight_clips')}</Text>,
      value: 'highlight_clips'
    },
    {
      label: <Text>{t('headlines')}</Text>,
      value: 'headlines'
    },
    {
      label: <Text>{t('coming_schedule')}</Text>,
      value: 'coming_schedule'
    }
  ];
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

  const getSubscription = () => {
    // setIsLoading(true);
    DataService.getSubscription()
      .then((response: ISubscriptionResponse) => {
        setSubscriptionTeams(response?.data?.teams);
        setSubscriptionPlayers(response?.data?.players);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  };

  useEffect(() => {
    getSubscription();
  }, []);

  console.count();

  return (
    <Box>
      <Container className="m-5">
        <Menu subscriptions={{ teams: subscriptionTeams, players: subscriptionPlayers }} />
      </Container>
      <Container className="border-y"></Container>
      <Separator />
      <Box className={` ${isMobile ? 'px-3' : 'px-32'} mx-9 justify-center mt-5`}>
        <Flex align="center" className="gap-4" wrap="wrap">
          {searchBy?.map(({ name, icon, playerIcon, abbreviation, id }) => (
            <AvatarBadge
              key={name}
              content={name}
              id={id}
              isClearable
              data={[
                { src: icon, fallback: abbreviation },
                ...(playerIcon ? [{ src: playerIcon, fallback: abbreviation }] : [])
              ]}
            />
          ))}
        </Flex>
        <Flex justify="between" align="baseline" className="py-9">
          <Digest />
        </Flex>
        <Flex justify="between" align="baseline" className="py-9">
          <FilterBy
            filterData={filterByData}
            onSelect={onSelect}
            onRemove={onRemove}
            selectedItems={selectedItems}
          />
          <Button className="opacity-50" onClick={() => setSelectedItems([])}>
            {t('clear_filters')}
          </Button>
        </Flex>

        {selectedItems.length == 0 || selectedItems.includes('highlight_clips') ? (
          <HighlightClips />
        ) : null}
        <Flex className="pb-9" direction={isMobile ? 'column' : 'row'}>
          {selectedItems.length == 0 || selectedItems.includes('headlines') ? (
            <Headlines subscriptions={subscriptionTeams} />
          ) : null}
          {selectedItems.length == 0 ||
          (selectedItems.includes('coming_schedule') && selectedItems.includes('headlines')) ? (
            <Separator orientation="vertical" className="mx-9" />
          ) : null}
          {selectedItems.length == 0 || selectedItems.includes('coming_schedule') ? (
            <ComingSchedule subscriptions={subscriptionTeams} />
          ) : null}
        </Flex>
        <News />
      </Box>
    </Box>
  );
};
