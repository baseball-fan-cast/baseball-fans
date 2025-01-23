import React, { useEffect, useState, useContext } from 'react';
import { Flex, Text, Separator, Spinner } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import { CustomPlayer } from './CustomPlayer';
import DataService from '@/services/DataService';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { IHighlightClipsGamesData, IHighlightClipsResponse } from '@/types';

export const HighlightClips = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [data, setData] = useState<IHighlightClipsGamesData[]>([]);
  const [clips, setClips] = useState<IHighlightClipsGamesData[]>([]);

  const { selectedFollower, setHeadlines, headlinesLoading, setHeadlinesLoading, searchBy } =
    useContext(ContentContext);

  const getHighlightClips = async () => {
    setHeadlinesLoading(true);
    await DataService.getMedia()
      .then((response: IHighlightClipsResponse) => {
        const { games } = response?.data || {};
        setData(games);
        setClips(games);
        setHeadlines(games);
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
        const videoData = [...games, ...data];
        setData(videoData);
        setClips(videoData);
        setHeadlines(games);
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
  }, [searchBy]);

  useEffect(() => {
    if (selectedFollower.id) {
      const filteredData = [...data]?.filter(({ teams }) =>
        teams.some(({ id }) => id == selectedFollower.id)
      );
      setClips(filteredData);
    } else {
      setClips(data);
    }
  }, [selectedFollower]);

  return clips?.length > 0 ? (
    <>
      <Text as="div" className="font-bold mb-5 text-2xl">
        {t('highlight_clips_replays')}
      </Text>
      {headlinesLoading ? (
        <div className="min-h-[250px]">
          <Spinner /> Loading ...
        </div>
      ) : (
        <Flex
          direction={isMobile ? 'column' : 'row'}
          justify="between"
          className="w-full gap-9 flex flex-wrap"
        >
          {clips?.slice(0, 5)?.map(({ media, name }, idx) => {
            const { date, url } = media || {};
            return (
              <CustomPlayer
                key={idx}
                url={url}
                avatarData={{ src: '', fallback: 'A', title: `${name}` }}
                date={date}
                title={name}
              />
            );
          })}
        </Flex>
      )}
      <Separator className="my-6" />
    </>
  ) : null;
};
