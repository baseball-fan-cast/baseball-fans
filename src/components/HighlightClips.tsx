import React, { useEffect, useState, useContext } from 'react';
import { Flex, Text, Separator } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import { CustomPlayer } from './CustomPlayer';
import DataService from '@/services/DataService';
import { ContentContext } from '@/context/ContentContextProvider';

export const HighlightClips = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed
  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);
  const [clips, setClips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { selectedFollower } = useContext(ContentContext);

  const getHighlightClips = () => {
    setIsLoading(true);
    DataService.getMedia()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setData(response?.data?.games);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!data?.length) return;
    const promises = data?.map(({ gamePk }) => DataService.getGameContent(gamePk));

    Promise.allSettled([...promises]).then((responses) => {
      setIsLoading(true);
      const processedResults = responses.map((response) => {
        if (response.status === 'fulfilled') {
          const {
            highlights: { items }
          } = response.value?.data?.highlights || {};
          const { playbacks, title, date, keywordsAll } = items[0] || {};
          const { url } = playbacks[0];
          const gamePk = keywordsAll.find(({ type }) => type == 'game_pk')?.value;

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
          setIsLoading(false);
        });
    });
  }, [data]);

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

  return (
    <>
      <Text as="div" className="font-bold mb-5 text-2xl">
        Highlight Clips and Replays
      </Text>
      {isLoading ? (
        'Loading ...'
      ) : (
        <Flex
          direction={isMobile ? 'column' : 'row'}
          justify="between"
          className="w-full gap-5 w-10/12 flex flex-wrap"
        >
          {clips?.map((item) => {
            const matched = data.find(({ gamePk }) => item?.gameLink.includes(gamePk));

            return (
              <CustomPlayer
                key={item.url}
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
  );
};
