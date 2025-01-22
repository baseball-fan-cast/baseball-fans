import React, { useState, useContext, useEffect } from 'react';
import { Separator } from '@radix-ui/themes';
import { Menu } from '../components/Menu';
import { Flex, Box } from '@radix-ui/themes';
import { Headlines } from '../components/Headlines';
import { ComingSchedule } from '../components/ComingSchedule';
import { useMediaQuery } from 'react-responsive';
import { ContentContext } from '../context/ContentContextProvider';
import DataService from '@/services/DataService';
import { HighlightClips } from '@/components/HighlightClips';
import { News } from '@/components/News';
import { ISubscriptionResponse } from '@/types';
import { Digest } from '@/components/Digest';
import { Header } from '@/components/Header';

export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [subscriptionTeams, setSubscriptionTeams] = useState();
  const [subscriptionPlayers, setSubscriptionPlayers] = useState();

  const { filterBy } = useContext(ContentContext);

  const getSubscription = () => {
    DataService.getSubscription()
      .then((response: ISubscriptionResponse) => {
        setSubscriptionTeams(response?.data?.teams);
        setSubscriptionPlayers(response?.data?.players);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    getSubscription();
  }, []);

  console.count();

  return (
    <>
      <Header />
      <Menu subscriptions={{ teams: subscriptionTeams, players: subscriptionPlayers }} />
      <Box className={` ${isMobile ? 'px-3' : 'px-32'} mx-9 justify-center mt-5`}>
        <Flex justify="between" align="baseline" className="py-9">
          <Digest />
        </Flex>

        {filterBy.length == 0 || filterBy.includes('highlight_clips') ? <HighlightClips /> : null}
        <Flex className="pb-9" direction={isMobile ? 'column' : 'row'}>
          {filterBy.length == 0 || filterBy.includes('headlines') ? (
            <Headlines subscriptions={subscriptionTeams} />
          ) : null}
          {filterBy.length == 0 ||
          (filterBy.includes('coming_schedule') && filterBy.includes('headlines')) ? (
            <Separator orientation="vertical" className="mx-9" />
          ) : null}
          {filterBy.length == 0 || filterBy.includes('coming_schedule') ? (
            <ComingSchedule subscriptions={subscriptionTeams} />
          ) : null}
        </Flex>
        <News />
      </Box>
    </>
  );
};
