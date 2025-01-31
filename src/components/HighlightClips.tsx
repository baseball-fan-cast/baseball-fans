import React, { useEffect, useState, useContext } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { IHighlightClipsGamesData, ISubscriptionData } from '@/types';
import { CustomPlayer } from './CustomPlayer';
import { LoadingIcon } from './LoadingIcon';

type IHighlightClips = {
  subscriptions: ISubscriptionData;
  data: IHighlightClipsGamesData[];
  loading: boolean;
};
export const HighlightClips = ({ subscriptions, data, loading }: IHighlightClips) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [clips, setClips] = useState({});
  const [displayItems, setDisplayItems] = useState(4);
  const { players, teams } = subscriptions;
  const { searchBy, selectedFollower } = useContext(ContentContext);

  const groupBy = [...searchBy, ...players, ...teams];

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
      {loading ? (
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
