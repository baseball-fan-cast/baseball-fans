import React, { useEffect, useState, useContext } from 'react';
import { Flex, Text, Separator, Spinner } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import { CustomPlayer } from './CustomPlayer';
import DataService from '@/services/DataService';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';

export const HighlightClips = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed
  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);
  const [clips, setClips] = useState([]);

  const {
    selectedFollower,
    headlines,
    setHeadlines,
    headlinesLoading,
    setHeadlinesLoading,
    highlightClips = {},
    searchBy
  } = useContext(ContentContext);

  const getHighlightClips = () => {
    DataService.getMedia()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setData(response?.data?.games);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    if (!data?.length && !Object.values(highlightClips)?.flat()?.length) return;
    const highlightClipsData = Object.values(highlightClips)?.flat();

    const promiseData = [...data, ...highlightClipsData];
    setHeadlinesLoading(true);
    const promises = promiseData?.map(({ gamePk }) => DataService.getGameContent(gamePk));

    Promise.allSettled([...promises]).then((responses) => {
      const processedResults = responses.map((response) => {
        if (response.status === 'fulfilled') {
          const {
            highlights: { items }
          } = response.value?.data?.highlights || {};
          const { playbacks, title, date, keywordsAll } = items[0] || {};
          const { url } = playbacks[0];
          const gamePk = keywordsAll.find(({ type }) => type == 'game_pk')?.value;
          const content = promiseData?.find((item) => item?.gamePk == gamePk) || {};
          headlines[`${gamePk}`] = { items: items[0], data: content };

          setHeadlines(headlines);

          const contentData = {
            url,
            gameLink: response.value?.data?.link,
            date,
            title,
            gamePk
          };

          return contentData;
        } else {
          return { status: 'rejected', reason: response.reason };
        }
      });

      Promise.all(processedResults) // Process the JSON responses
        .then((data) => {
          setContent(data);
          setClips(data);
        })
        .finally(() => setHeadlinesLoading(false));
    });
  }, [data, highlightClips, searchBy]);

  useEffect(() => {
    getHighlightClips();
  }, []);

  useEffect(() => {
    if (selectedFollower.id) {
      const filteredData = [...data]?.filter(({ teams }) =>
        teams.some((team) => team.id == selectedFollower.id)
      );
      const filteredContent = [...content]?.filter(({ gamePk }) =>
        filteredData.some((team) => team?.gamePk == gamePk)
      );
      setClips(filteredContent);
    } else {
      setClips(content);
    }
  }, [selectedFollower]);

  return clips?.length > 0 ? (
    <>
      <Text as="div" className="font-bold mb-5 text-2xl">
        {t('highlight_clips_replays')}
      </Text>
      {headlinesLoading ? (
        <div className="min-h-[250px]">
          <Spinner />
        </div>
      ) : (
        <Flex
          direction={isMobile ? 'column' : 'row'}
          justify="between"
          className="w-full gap-9 flex flex-wrap"
        >
          {clips?.map((item, idx) => {
            const highlightClipsData = Object.values(highlightClips)?.flat();
            const matched = [...data, ...highlightClipsData].find(({ gamePk }) => {
              return item?.gameLink?.includes(gamePk);
            });

            return (
              <CustomPlayer
                key={idx}
                url={item.url}
                avatarData={{ src: '', fallback: 'A', title: `${matched?.name}` }}
                date={matched?.date}
                title={item.title}
              />
            );
          })}
        </Flex>
      )}
      <Separator className="my-6" />
    </>
  ) : null;
};
