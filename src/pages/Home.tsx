import React, { useContext } from 'react';
import { Menu } from '../components/Menu';
import { Headlines } from '../components/Headlines';
import { useMediaQuery } from 'react-responsive';
import { ContentContext } from '../context/ContentContextProvider';
import { HighlightClips } from '@/components/HighlightClips';
import { News } from '@/components/News';
import { Digest } from '@/components/Digest';
import { Header } from '@/components/Header';
import { useNews } from '@/hooks/useNews';
import { useSubscription } from '@/hooks/useSubscription';
import { useSeasonSchedule } from '@/hooks/useSeasonSchedule';
import { useDigest } from '@/hooks/useDigest';
import { useMedia } from '@/hooks/useMedia';

// import Translator from './Translator';

export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { filterBy, selectedLatestNews, searchBy } = useContext(ContentContext);
  const { data: newsData, loading: newsLoading } = useNews();
  const { subscriptionTeams, subscriptionPlayers } = useSubscription();
  const { scheduleData, scheduleDataLoading } = useSeasonSchedule();
  const { data: digest, loading: digestLoading } = useDigest();
  const { data: mediasData, headlines, headlinesLoading } = useMedia();

  console.count();

  const displaySchedule = filterBy.length == 0 || filterBy.includes('coming_schedule');
  const displayHighlightClips = filterBy.length == 0 || filterBy.includes('highlight_clips');
  const displayHeadlines = filterBy.length == 0 || filterBy.includes('headlines');

  const groupBy = [...searchBy, ...subscriptionPlayers, ...subscriptionTeams];

  const content = groupBy?.length ? (
    <>
      <Digest
        playersIds={subscriptionPlayers}
        content={digest}
        scheduleData={scheduleData}
        loading={digestLoading}
        scheduleDataLoading={scheduleDataLoading}
      />
      {displayHighlightClips ? <div className="border-t-2 my-7" /> : null}
      {displayHighlightClips ? (
        <HighlightClips
          subscriptions={{ teams: subscriptionTeams, players: subscriptionPlayers }}
          data={mediasData}
          headlinesLoading={headlinesLoading}
        />
      ) : null}
      {displayHeadlines ? <div className="border-t-2 my-7" /> : null}
      {displayHeadlines ? (
        <Headlines
          subscriptions={{ teams: subscriptionTeams, players: subscriptionPlayers }}
          headlines={headlines}
        />
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
      <div className={`bg-stone-100 ${isMobile ? 'px-3' : 'px-32'} py-2 pb-9 min-h-screen`}>
        <div className="border-t-2 pt-7 " />
        {selectedLatestNews ? <News data={newsData} loading={newsLoading} /> : content}
      </div>
    </>
  );
};
