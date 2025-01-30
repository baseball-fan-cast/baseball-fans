import React, { useEffect, useState, useContext } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import DataService from '@/services/DataService';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { IHighlightClipsGamesData, IHighlightClipsResponse } from '@/types';
import { ISubscriptionData } from '@/types';
import { CustomPlayer } from './CustomPlayer';
import { LoadingIcon } from './LoadingIcon';

export const HighlightClips = ({ subscriptions }: { subscriptions: ISubscriptionData }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [data, setData] = useState<IHighlightClipsGamesData[]>([]);
  const [clips, setClips] = useState({});
  const [displayItems, setDisplayItems] = useState(4);
  const { players, teams } = subscriptions;

  const { setHeadlines, headlinesLoading, setHeadlinesLoading, searchBy, selectedFollower } =
    useContext(ContentContext);
  const groupBy = [...searchBy, ...players, ...teams];

  const getHighlightClips = async () => {
    if (!groupBy.length) return null;
    setHeadlinesLoading(true);
    await DataService.getMedia()
      .then((response: IHighlightClipsResponse) => {
        const { games } = response?.data || {};
        const groupedData = groupBy?.reduce((result, item) => {
          const id = item?.isPlayer ? item?.teamId : item?.id;
          result[id] = [...games]?.filter(({ teams }) => teams[0].id == id || teams[1].id == id);
          return result;
        }, {});
        setData(groupedData);
        setHeadlines(groupedData);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => setHeadlinesLoading(false));
  };

  const getHighlightClipById = async (id) => {
    setHeadlinesLoading(true);
    await DataService.getMediaByTeamId(id)
      .then((response: IHighlightClipsResponse) => {
        const { games = [] } = response?.data || {};

        const groupedData = groupBy?.reduce((result, item) => {
          const id = item?.isPlayer ? item?.teamId : item?.id;
          result[id] = [...games]?.filter(({ teams }) => teams[0].id == id || teams[1].id == id);
          return result;
        }, {});
        setData({ ...groupedData, ...data });
        setHeadlines({ ...groupedData, ...data });
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => setHeadlinesLoading(false));
  };

  useEffect(() => {
    if (searchBy.length) {
      const ids = searchBy.map(({ id }) => id).join(',');
      getHighlightClipById(ids);
    } else {
      getHighlightClips();
    }
  }, [searchBy, players, teams]);

  useEffect(() => {
    if (selectedFollower.id) {
      const id = selectedFollower.isPlayer ? selectedFollower.teamId : selectedFollower.id;
      setClips({ [id]: data[id] });
      setDisplayItems(4);
    } else {
      setClips(data);
      setDisplayItems(Object.keys(data).length < 4 ? 2 : 1);
    }
  }, [selectedFollower, data]);

  if (!groupBy.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg">
      <Text as="div" className="font-bold mb-5 text-2xl">
        {t('highlight_clips_replays')}
      </Text>
      {headlinesLoading ? (
        <LoadingIcon />
      ) : (
        <Flex
          direction={isMobile ? 'column' : 'row'}
          className="w-full gap-9 flex flex-wrap justify-start"
        >
          {Object.entries(clips)?.map(([key, content]) => {
            return content?.slice(0, displayItems)?.map((item, idx) => {
              const { media, name } = item;
              const { date, url } = media || {};
              const match = groupBy?.find(({ id, teamId }) => key == id || key == teamId) || {};
              const { icon, playerIcon, abbreviation, teamName, fullName } = match;
              return (
                <CustomPlayer
                  key={idx}
                  url={url}
                  avatarData={{
                    icon,
                    playerIcon,
                    abbreviation,
                    name: `${fullName || teamName || match?.name}`
                  }}
                  date={date}
                  title={name}
                />
              );
            });
          })}
        </Flex>
      )}
    </div>
  );
};
