import React, { useEffect, useState, useContext } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
// import { CustomPlayer } from './CustomPlayer';
import DataService from '@/services/DataService';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { IHighlightClipsGamesData, IHighlightClipsResponse } from '@/types';
import { ISubscriptionData } from '@/types';

export const HighlightClips = ({ subscriptions }: { subscriptions: ISubscriptionData }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [data, setData] = useState<IHighlightClipsGamesData[]>([]);
  // const [clips, setClips] = useState<IHighlightClipsGamesData[]>([]);
  const { players, teams } = subscriptions;
  const followed = [...players, ...teams];
  //selectedFollower,
  const { setHeadlines, headlinesLoading, setHeadlinesLoading, searchBy } =
    useContext(ContentContext);
  console.log('followed', followed);

  const getHighlightClips = async () => {
    setHeadlinesLoading(true);
    await DataService.getMedia()
      .then((response: IHighlightClipsResponse) => {
        const { games } = response?.data || {};
        // console.log('games', games)
        // const groupedById = games?.reduce((result, curr) => {
        //   result[curr.id] = result[curr.id] ? [...result[curr.id], ...[curr]] : [curr];
        //   return result;
        // }, {})

        setData(games);
        // setClips(games);
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
        // setClips(videoData);
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

  // useEffect(() => {
  //   if (selectedFollower.id) {
  //     const filteredData = [...data]?.filter(({ teams }) =>
  //       teams.some(({ id }) => id == selectedFollower.id)
  //     );
  //     setClips(filteredData);
  //   } else {
  //     setClips(data);
  //   }
  // }, [selectedFollower]);

  useEffect(() => {
    console.log('data', data);

    const groupedById = followed?.reduce((result, curr) => {
      result[curr.id] = data
        ?.filter(({ teams }) => teams[0].id == curr.id || teams[1].id == curr.id)
        ?.map((data) => {
          // console.log('data', data)
          // const { description, highlightId: id, headline } = media;
          return { ...data, id: curr.id, name: curr.name || curr.fullName };
        });
      return result;
    }, {});
    console.log('!groupedById', groupedById);
  }, [followed, data]);

  return (
    <div className="bg-white p-4 rounded-lg">
      <Text as="div" className="font-bold mb-5 text-2xl">
        {t('highlight_clips_replays')}
      </Text>
      {headlinesLoading ? (
        <div className="min-h-[250px]">Loading ...</div>
      ) : (
        <Flex
          direction={isMobile ? 'column' : 'row'}
          justify="between"
          className="w-full gap-9 flex flex-wrap"
        >
          {/* {Object.entries(data)?.map(([key, content]) => {
             
              return content?.slice(0, 2)?.map(item, idx) => { 
               console.log("INSIDE",key, item)
              })
             })} */}
          {/* {Object.entries(data)?.map(([key, content]) => { 
              return content?.slice(0, 2)?.map(item, idx) => { 
              console.log(item);
                const { media, teams } = item;
                const { date, url } = media || {};
                return (
                  <CustomPlayer
                    key={idx}
                    url={url}
                    avatarData={{ src: '', fallback: 'A', title: `${name}` }}
                    date={date}
                    title={name}
                  />
                )
              })
            }) */}
        </Flex>
      )}
    </div>
  );
};
