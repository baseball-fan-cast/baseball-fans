import React, { useState, useContext, useEffect } from 'react';
import { Menu } from '../components/Menu';
import { Headlines } from '../components/Headlines';
import { useMediaQuery } from 'react-responsive';
import { ContentContext } from '../context/ContentContextProvider';
import DataService from '@/services/DataService';
import { HighlightClips } from '@/components/HighlightClips';
import { News } from '@/components/News';
import { ISubscriptionPlayer, ISubscriptionResponse, ISubscriptionTeam } from '@/types';
import { Digest } from '@/components/Digest';
import { Header } from '@/components/Header';
// import Translator from './Translator';

export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [subscriptionTeams, setSubscriptionTeams] = useState<ISubscriptionTeam[]>([]);
  const [subscriptionPlayers, setSubscriptionPlayers] = useState<ISubscriptionPlayer[]>([]);

  const { filterBy, allPlayers, selectedLatestNews, searchBy } = useContext(ContentContext);

  const getSubscription = () => {
    DataService.getSubscription()
      .then((response: ISubscriptionResponse) => {
        setSubscriptionTeams(response?.data?.teams);

        const players = response?.data?.players?.map((item) => {
          return {
            ...item,
            teamId: allPlayers.find((allPl) => allPl?.id == item.id)?.teamId
          };
        });
        setSubscriptionPlayers(players);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    getSubscription();
  }, [allPlayers]);

  console.count();

  const displaySchedule = filterBy.length == 0 || filterBy.includes('coming_schedule');
  const displayHighlightClips = filterBy.length == 0 || filterBy.includes('highlight_clips');
  const displayHeadlines = filterBy.length == 0 || filterBy.includes('headlines');

  const groupBy = [...searchBy, ...subscriptionPlayers, ...subscriptionTeams];

  const content = groupBy?.length ? (
    <>
      <Digest teamIds={subscriptionTeams} playersIds={subscriptionPlayers} />
      {displayHighlightClips ? <div className="border-t-2 my-7" /> : null}
      {displayHighlightClips ? (
        <HighlightClips
          subscriptions={{ teams: subscriptionTeams, players: subscriptionPlayers }}
        />
      ) : null}
      {displayHeadlines ? <div className="border-t-2 my-7" /> : null}
      {displayHeadlines ? (
        <Headlines subscriptions={{ teams: subscriptionTeams, players: subscriptionPlayers }} />
      ) : null}
      {displaySchedule && <div className="border-t-2 my-7" />}
    </>
  ) : (
    <div className="min-h-[500px] flex justify-center items-center">
      Please search by teams or players
    </div>
  );

  return (
    <>
      <Header />
      <Menu subscriptions={{ teams: subscriptionTeams, players: subscriptionPlayers }} />
      <div className={`bg-stone-100 ${isMobile ? 'px-3' : 'px-32'} py-2 pb-9`}>
        <div className="border-t-2 pt-7 " />
        {selectedLatestNews ? <News /> : content}
      </div>
    </>
  );
};
